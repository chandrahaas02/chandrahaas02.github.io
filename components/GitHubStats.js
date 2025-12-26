import {GitHubCalendar} from 'react-github-calendar';
import Link from 'next/link';

export default function GitHubStats() {
    return (
        <div className="px-6 sm:px-12 lg:px-24 py-12 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-sm font-mono text-zinc-500 mb-12 tracking-widest uppercase">GitHub Stats</h2>

                <div className="flex flex-col gap-12">

                    {/* Contribution Graph */}
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors overflow-x-auto">
                        <h3 className="text-lg font-medium text-zinc-200 mb-6">Contribution History</h3>
                        <div className="flex justify-center min-w-[700px]">
                            <GitHubCalendar
                                username="chandrahaas-komprise"
                                colorScheme="dark"
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <Link href="https://github.com/chandrahaas02" target="_blank" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors border-b border-transparent hover:border-zinc-500 pb-0.5">
                            View comprehensive profile on GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
