"use client"; // if using Next.js app router

import { DiscussionEmbed } from "disqus-react";

export default function DisqusComments({ url, identifier, title }) {
  const disqusShortname = "chandrahaas02-github-io"; // from your Disqus site
  const disqusConfig = {
    url,
    identifier, // usually slug or id of the post
    title,
  };

  return (
    <div className="mt-10">
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}
