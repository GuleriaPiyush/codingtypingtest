export const SkipToContent = () => {
  return (
    <a
      href="#main-typing-area"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-main)] focus:text-[var(--color-bg)] focus:font-bold focus:rounded-md focus:outline-none"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
