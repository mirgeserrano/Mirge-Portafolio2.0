const RouteLoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-700 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-200">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-8 h-4 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />

        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-3">
            <div className="h-6 w-52 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-80 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-10 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-52 w-full bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-3 p-4">
                <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-3/4 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-5/6 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="flex gap-2 pt-2">
                  <div className="h-7 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="h-7 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouteLoadingSkeleton;
