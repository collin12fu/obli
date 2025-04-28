//nice gold spinning circle loader

'use client';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="border-8 border-t-8 border-[#CBAA6F] rounded-full h-24 w-24 animate-spin"></div>
    </div>
  );
}