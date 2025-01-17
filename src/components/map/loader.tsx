export function Loader() {
  return (
    <div className="flex w-12 h-12">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-4 border-dashed border-gray-200"></div>

        <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-dashed border-primary-base border-t-transparent"></div>
      </div>
    </div>
  );
}

export function LoaderContent() {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <Loader />
      <span className="text-sm">Carrendando o mapa</span>
    </div>
  );
}
