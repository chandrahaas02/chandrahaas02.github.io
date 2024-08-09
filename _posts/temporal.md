---
title: "A talk on video bandwidth"
categories:
  - AI
tags:
  - thoghts
  - VSR

date: "2022-08-09"
---

Reducing bandwidth of videos is big task for many companies across the globe companies like google and Netflix have patterned to create most advance codec and royalty free codecs for videos along many more open source organizations and companies. The current existing best codec is av1 but being a data science enthusiast my self, I want to add ML/DL approach to reduce bandwidth of videos.

Let us see few methods involved in Current methods, so we can try to investigate further about adding DL approaches to reduce bandwidth of videos.

As we discussed that there are few existing stuff going on during encoding and decoding, this process involves some loss of data let us try to understand what kind of data we are loosing, In these we will see about
 1. chroma Subsampling
 2. Compression using IBP policy

A detailed look into this can be taken from this excellent repo called [intro digital video](https://github.com/leandromoreira/digital_video_introduction)

## chroma subsampling

Our eye is more specific to luminosity than the chromocene, this particular reason make us feel that the chromocene is not so important feature, so we can reduce its data, even go further and remove the humid part of image completely because we are less sensitive changes in red colour, this introduces to new space called Ycbcr color space (it was ycv earlier)

We reduce the data to such level the .H264 codecs maintains 4:2:0 of Ycbcr, that means for every 4 pixels of Y we have only 2 pixels of cb and the cr component is completely removed


## IBP frames

* An I-frame (reference, keyframe, intra) is a self-contained frame. It doesn't rely on anything to be rendered, an I-frame looks similar to a static photo. The first frame is usually an I-frame but we'll see I-frames inserted regularly among other types of frames.
* A P-frame takes advantage of the fact that almost always the current picture can be rendered using the previous frame. For instance, in the second frame, the only change was the ball that moved forward. We can rebuild frame 1, only using the difference and referencing to the previous frame.
* What about referencing the past and future frames to provide even a better compression?! That's basically what a B-frame is.

After this we remove all the high frequency information from these P and B frames

## Is Temporal Overrated ?

* The initial phase of video super resolution was stacking images and using existing SISR models to achieve Super resolution
* Later the temporal part came into play and people started to make a big model or make existing models too Recurrent to include the temporal information, but what is the importance of temporal information can’t just this image be sufficient to get Super resolution image ?

## Mix VSR to existing Solutions

VSR methods expect that there is no loss in data because they will almost remove the data, so they expect there initial methods to have good quality of data
One of the famous methods of integrating is Using VSR for only for Y channel and using simple bicubic interpolation
Some crazy ideas to study are
      1. [Super Resolution of Video Using Key Frames](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.567.5623&rep=rep1&type=pdf)
      2. [COMISR](https://openaccess.thecvf.com/content/ICCV2021/papers/Li_COMISR_Compression-Informed_Video_Super-Resolution_ICCV_2021_paper.pdf)


## VSR or MSR ?

* The most existing super resolution methods uses multiple frames to predict the current frame, So you are restricting that the temporal relationship between the frames are restricted into these frames
* So is this called video super resolution or Multi frame super resolution this was question raised in AI researchers in Meta, so they came with a solution called [RVRT](https://arxiv.org/abs/2206.02146) where temporal relation is calculated using attention at an expense of computation

## Conclusions
* The existing AI models are not in a state to recreate the created video, AI is used to guess new data, but it is not advised to it to recreate the data which we wanted to be lost because Guessing is never as precise as original
* Few different ways of ideology according to Noah’s arc team of heuwai technologies they try to transfer Y component as it is but want to do super resolution on Cb component, so they can reduce bandwidth, Also see about av1 and current status of av2 to understand how we can compress videos without losing the data



