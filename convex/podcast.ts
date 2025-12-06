/**
 * Convex Db schema & methods
 */


import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createPodcast = mutation({
    args: {
        audioStorageId: v.id("_storage"),
        podcastTitle: v.string(),
        podcastDesc: v.string(),
        audioUrl: v.string(),
        imageUrl: v.string(),
        imageStorageId: v.id("_storage"),
        voicePrompt: v.string(),
        imagePrompt: v.string(),
        voiceType: v.string(),
        views: v.number(),
        audioDuration: v.number(),
    },
    handler: async(ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new ConvexError("Unauthorized - Please sign in");
        }

        // find existing user
        let user = await ctx.db
            .query("users")
            .filter((c) => c.eq(c.field("email"), identity.email))
            .first();

        // If user doesn't exist, auto-create them (fallback for webhook issues)
        if (!user) {
            const userId = await ctx.db.insert("users", {
                clerkId: identity.subject,  // clerk userId
                email: identity.email!,
                name: identity.name || identity.email?.split("@")[0] || "User",
                imageUrl: identity.pictureUrl || "",
            });
            user = await ctx.db.get(userId);
        }

        if (!user) {
            throw new ConvexError("Failed to create or find user");
        }

        return await ctx.db.insert("podcasts", {
            audioStorageId: args.audioStorageId,
            user: user._id,
            podcastTitle: args.podcastTitle,
            podcastDesc: args.podcastDesc,
            audioUrl: args.audioUrl,
            imageUrl: args.imageUrl,
            imageStorageId: args.imageStorageId,
            author: user.name,
            authorId: user.clerkId,
            voicePrompt: args.voicePrompt,
            imagePrompt: args.imagePrompt,
            voiceType: args.voiceType,
            views: args.views,
            authorImageUrl: user.imageUrl,
            audioDuration: args.audioDuration,
        });
    }
})

// this will generate the url after uploading the file to the storage

export const getUrl = mutation({
    args: {
        storageId: v.id("_storage")
    },
    handler: async(ctx , args)=>{
        return await ctx.storage.getUrl(args.storageId);
    }
})

// this will bring podcast based on the voiceType of the podcast
export const getPodcastByVoiceType = query({
    args: {
        podcastId: v.id("podcasts"),
    },
    handler: async(ctx , args)=>{
        // !this may give you all podcast based on your podcast
        const podcast = await ctx.db.get(args.podcastId);

        return await ctx.db.query("podcasts").filter((c)=> c.and(c.eq(c.field("voiceType"), podcast?.voiceType),c.neq(c.field("_id"), args.podcastId))).collect();
    }

})

// this will get you all the podcast
export const getAllpodcast = query({
    handler: async(ctx)=>{
        return await ctx.db.query("podcasts").order("desc").collect();
    }
})

//get the podcast by the podcast id
export const getPodcastById = query({
    args: {
        podcastId: v.id("podcasts"),
    },
    handler: async(ctx, args)=> {
        return await ctx.db.get(args.podcastId);
    }
})

//get podcast besed on views
export const getTrendingPodcasts = query({
    handler : async(ctx)=>{
        const podcasts = await ctx.db.query("podcasts").collect();

        // !this will give you the top 8 podcast based on the views
        return podcasts.sort((a,b)=> b.views - a.views).slice(0,8);
    }
})

//get podcast by the authorId
export const getPodcastByAuthorId = query({
    args: {
        authorId: v.string(),
    },
    handler: async(ctx , args)=>{
        const podcasts = await ctx.db.query("podcasts").filter((c)=> c.eq(c.field("authorId"), args.authorId)).collect()

        const totalListeners = podcasts.reduce((sum, podcasts)=> sum + podcasts.views,0 );

        return {podcasts, totalListeners}
    }
})

// get podcast by search query

export const getPodcastBySearch = query({
    args: {
        search: v.string(),
    },
    handler: async(ctx, args)=> {
        if(args.search === ""){
            return await ctx.db.query("podcasts").order("desc").collect();
        }

        const authorSearch = await ctx.db.query("podcasts").withSearchIndex("search_author", (q) => q.search("author", args.search)).take(10)

        if(authorSearch.length > 0){
            return authorSearch;
        }

        const titleSearch = await ctx.db.query("podcasts").withSearchIndex("search_title", (q) => q.search("podcastTitle", args.search)).take(10)

        if (titleSearch.length > 0){
            return titleSearch
        }

        return await ctx.db
      .query("podcasts")
      .withSearchIndex("search_desc", (q) =>
        q.search("podcastDesc", args.search)
      )
      .take(10);
    }
})

//update podcast views
export const updatePodcastViews = mutation({
    args: {
        podcastId: v.id("podcasts"),
    },
    handler: async(ctx , args) => {
        const podcast = await ctx.db.get(args.podcastId)

        if(!podcast){
            return new ConvexError("Podcast not found")
        }

        return await ctx.db.patch(args.podcastId, {
            views: podcast.views + 1,
        })

    }
})

export const deletePodcast = mutation({
    args: {
        podcastId: v.id("podcasts"),
        imageStorageId: v.id("_storage"),
        audioStorageId: v.id("_storage"),
    },
    handler: async (ctx , args) => {
        const podcast = await ctx.db.get(args.podcastId);

        if (!podcast) {
            throw new ConvexError("Podcast not found");
          }
      
          await ctx.storage.delete(args.imageStorageId);
          await ctx.storage.delete(args.audioStorageId);
          return await ctx.db.delete(args.podcastId);
    }
})

