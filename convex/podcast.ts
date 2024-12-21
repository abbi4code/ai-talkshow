import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { CarTaxiFront } from "lucide-react";


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
        const userAuthorize = await ctx.auth.getUserIdentity();

        if(!userAuthorize){
            throw new ConvexError("Unauthorized");
        }

        const user = await ctx.db.query("users").filter((c)=> c.eq(c.field("email"), userAuthorize.email)).collect();

        if(user.length === 0){
            throw new ConvexError("User not found");
        }

        return await ctx.db.insert("podcasts",{
            audioStorageId: args.audioStorageId,
            user: user[0]._id,
            podcastTitle: args.podcastTitle,
            podcastDesc: args.podcastDesc,
            audioUrl: args.audioUrl,
            imageUrl: args.imageUrl,
            imageStorageId: args.imageStorageId,
            author: user[0].name,
            authorId: user[0].clerkId,
            voicePrompt: args.voicePrompt,
            imagePrompt: args.imagePrompt,
            voiceType: args.voiceType,
            views: args.views,
            authorImageUrl: user[0].imageUrl,
            audioDuration: args.audioDuration,
        })
    }
})

// this will generate the url after uploading the file to the storage

export const getUrl = query({
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

