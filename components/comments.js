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
    <div id="disqus_thread" className="mt-10 bg-slate-950 text-slate-100 p-4 rounded-lg shadow">
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}
