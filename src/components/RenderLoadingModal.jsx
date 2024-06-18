import { Loading } from '../assets';

const RenderLoading = () => {
  return (
    <div className="lg:col-span-3 md:col-span-3 sm:col-span-4 p-6">
      <div className="flex items-center justify-center w-30 h-30 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div role="status">
          <Loading />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default RenderLoading;