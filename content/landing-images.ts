/**
 * Stitch V6 original AI-generated image assets.
 * Source of truth: prompts/codev6_stitch.MD
 */
export const landingImages = {
  logo: "/images/logorae3.jpg",
  heroBackground: "/images/stitch-v6/hero-background.jpg",
  pillars: {
    researchExcellence: "/images/stitch-v6/research-excellence.jpg",
    academicServices: "/images/stitch-v6/academic-services.jpg",
    communityImpact: "/images/stitch-v6/community-impact.jpg",
  },
  researchToCommunity: "/images/stitch-v6/research-to-community.jpg",
  showcase: {
    integratedResearch: "/images/stitch-v6/integrated-research.jpg",
    academicServices: "/images/stitch-v6/academic-services.jpg",
    knowledgeTransfer: "/images/stitch-v6/knowledge-transfer.jpg",
    farmerEngagement: "/images/stitch-v6/farmer-engagement.jpg",
    communityDevelopment: "/images/stitch-v6/community-impact.jpg",
  },
  ecosystem: "/images/stitch-v6/knowledge-ecosystem.jpg",
  signatureBackground: "/images/stitch-v6/signature-background.jpg",
  news: {
    featured: "/images/stitch-v6/news-featured.jpg",
    smartExtension: "/images/stitch-v6/farmer-engagement.jpg",
    precisionAgriculture: "/images/stitch-v6/knowledge-transfer.jpg",
  },
} as const;

/** Original Stitch CDN URLs — used only for one-time asset download. */
export const stitchImageSources: Record<string, string> = {
  "logo.jpg":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCZkicR5uzWvSI-CUvewVLsCoYj5Yf4Ztm5DfszzFOqcmcblAMRj1W5ze8nO7EvfyC1UxTeZ5ITGCtXsDP2-ouOoigXP-L-Gf2aGaZPfLW2iS1CDFpsEO3nakYTAo-wCJc6j7mCXs4FY0aDIVGySaE36L6tljBUwzr6-6RyZCcYj-ud-RoeCj6GoPjgky-CbDZqjZQQ0jRlGWNMXWX7bVrZ3JRJ3hQRkncaJdkjEcde_xY0bJ33IjlBINJpMQSVjbWv5HVCiS1HpAg",
  "hero-background.jpg":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBGwwC-pCcEe24TsctdcOxjL40dfW7bQmHzM9chUNgIIWRObIgd9_vQ5xiDnYjxB-MKKMmIS4IC3i7dD2CMvmxUaiOaCqzMqXzWuhjFvmHj0nu33b_t9u8AEHYK2UPKBiVU1rd3zXj92entIOPOUlmXWgj_KiiHDzsr14-9rSGCOnLdRtVqnDt9VdZEDCWVZq1gk8nQBCa4EdAVzEE8qcTYbinbg2wKrpG5NSXRvxTFvdwZgBMeN-lh_8LiytxKzFqJun_2kW156Qk",
  "research-excellence.jpg":
    "https://lh3.googleusercontent.com/aida/AP1WRLsnLxT1dKPdH-qUKdQyxIMs-XXv1GmviH37nunpxusGgL-S8m-rGiTIa4Qa27E-R6OnbbEujQZ2NcLJbNNhFNzXMi6i6yBkw-FoHUHKMV8fL0K8I3A4MpCIWG19J9P6P86ibKj-zbP-8fOk-RNSOw9yhj87xtjLggxEQ7PSNezKkyFd9dfE5xk8GGVFtg7S2_WSEIhmaxB41oc2uAiMaTNvbab08g51Kn2G_mW_2oo7YQmi2PSLeINp39s",
  "academic-services.jpg":
    "https://lh3.googleusercontent.com/aida/AP1WRLvsEtME5Y_HyOTApMC1otTG555C4WJrb9Qr2LDrB7E5-GPv_621pUW_5gQdNr71xyYLRdILJ1b0bXx_yrV4doKyUaThb5YoZLJoqrUSTFVoYSt6rv_VUmWmKvyf0nl70aX8FB918kfn0jcC7gw1oPY1dLH1NgjbTcOF9cbR0Z4ml1KVjFnj8kwUICPZu0xVRKLN_XnqHUqphQEh125wGr8wUW_WbDVdLSlKCwMvpf4Skdv8pkB59XJdrrs",
  "community-impact.jpg":
    "https://lh3.googleusercontent.com/aida/AP1WRLu6k87uxlc3P8noJ70KIHZh4lbHGk63KFo-6WmfH68m6aMWVSvsx4eokQjZwNzY8eXkUgvp09NBBg5raPZh04LA5aC8DLfQ8sUXQ1PMEz159M5DZ99HGNRm_UCnq9MA3gaTebiSgcbzGxiYdp9cn67HnfIWW5eTdCAjt4-jh6kaNPBtmdDNvDlTLbP7GZkyrzP52rPICkn_gZVMuOXV-7CwxbtzRar3Ij8hB-hUYg-UD63mIv7RlEptPgU",
  "research-to-community.jpg":
    "https://lh3.googleusercontent.com/aida/AP1WRLut7JXKFyWPBHOQPbr753BF9y5HbhRz484iSkeJlXYdKcYS6hPsVshiO1jN5DBcl-E86XgZEcR8ilv2AD-oTU_duZhamH6p6apRGX__Jw5zd0p8Zes_NCQKvuNlawEZNBt_xVdMdRd9P8wMi_2YJ3EGkTwGn5crFuEcrRffIFJPTxn_VZLTZGdnHY4w9A6qCYI15UrNgQF3d7iCCfIGX-e45x6Xg0WapxHOJpUvfFm5PBZVwn_9rVbBq1w",
  "integrated-research.jpg":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBDOfojVXsAGsxiTJsrvENXDJxhToU7wvaKlDoA0Au_dQS9Pw6oM768iXX13fusbwnmbvKCs5piTDouemqLV3dugzzxx4TiN4gVTgQeICixSVb-20fkXHb1LsRuf92DTcRqg5I9T77GKBRVBXTbGUTtlWXJOB9lkZA47_oBK027b5_61ZIkKcEl5dHocARtM41fnHjuAwLQdJbS-EHxtOyu1_CMWXeviu5ZORxk2AmpreCsqwXie7yKPbsi7JPoXtYYRqhICWOk9_I",
  "knowledge-transfer.jpg":
    "https://lh3.googleusercontent.com/aida/AP1WRLvs9d6ARXVyrBDmviz4sXpqel7WhrN1Spq-q3vJ8f95tMbBcEwPw89WOrLDlHH3YGBk-Te7SX0FvpoLgetSRvJQJNLlB53NEaCRHb7hGQqY1wtO_YQIgKYXuI8tpQZboiYEYvQxhq7EcmHSQq2I8wtIvKFEwMk30jzYlzu1WCD_Khr8eaJXvXX01QmseCvaL2gZhjE9IXu0wL4GkCmvy1flfAlij0HzD_x2QboT_6wbxsI-kZwi6fYGBDM",
  "farmer-engagement.jpg":
    "https://lh3.googleusercontent.com/aida/AP1WRLvhufWWckMfNluf2FlSD-driOv4sNB-vl8RGkBDky7aWKAlp2-fzbrysio7pVDJgnhBJvDR1FZjeF6TFbNAZ_3g9DvodT66TWhLMNw9VJYCB2DPdSg_fOKmaIOHL8oz6jQQa4OWHn631KP09itdHZkfj5gAiOjXEU5IlcQP9T-d8TWThoUqPCtrqLGntKJrvtYissQknjcyxDI3qJ06tfb304vyqU1o1ej_eWSJ53N_4cc6ioqIfyHAvQo",
  "knowledge-ecosystem.jpg":
    "https://lh3.googleusercontent.com/aida/AP1WRLvRNtcbjVbEt7x4uwFkX5zdqdw5ZUZBYpZyOyP66emUha5bJiXdxaqBY0xB-d_InVyA-ylFr2VzOeueOjJPa76BisRMt1pyyZmlDCaBxlVC-BjOm8OsEEnoM8cWKjNcO4Cwts0HlT0Xzu91inUEA7C7ziBnjwkrM6rGrGR8BB31oZDnvLPBDyXeaK1IQdApluc7ZVZnyNpYBRrHiuAOdb9eATNateWNg8jmQ9jjmJ_fURgdcGM0wQHM73E",
  "signature-background.jpg":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxjDkmkzAOqwDCjjtZHTrVsUKMiG_pnmLeiDwxXsj6mivZp37olZlUztNuXWbc0v_VPcLmEzRbf3sKiriSb4DutJsRIcjNd7nFj0nGSTPqma3vpNOgfiojt3V1m4Fz2dIss1YXw_8Ou3BTrAp-Q-JWSOymDRz1uAtxt2MI8Js_z7ZYZLl-hEQi63e_HLx_9vOineaZZcSnk5p1hcCUk06NxQ8BSt3qEv1SH15AoL5Q6zoPRxPaJ3vi4oKQn-ulCA_-0eykKbrS48g",
  "news-featured.jpg":
    "https://lh3.googleusercontent.com/aida/AP1WRLus7meqxXhlp_H2-TxY0bACQbmRpaZFcxv2j-hbs7do5Tl9nABuppScQm4aDoLIrw_sLjYs5J6hRnYuTx3cTmmtV6XKUi9Cj_hqQRYHnNRWHPdS_89PMGkizf9ap--g5xKz69kO-1b_r-WaoY4TbXtxmKe3pjUS9RHZLSdJYtEQU-NDgl3CtzthebhgsUvMpVoVhe9C0Wnk60LQcfn5GIC3EN1q3UQZjqOzgU2qLMYbnrwBicsAdkF3jg",
};
