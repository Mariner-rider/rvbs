import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

const Toaster = (props) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#fff] group-[.toaster]:text-[#020817] group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[#64748b]",
          actionButton:
            "group-[.toast]:bg-[#2463eb] group-[.toast]:text-[#f8fafc]",
          cancelButton:
            "group-[.toast]:bg-[#f1f5f9] group-[.toast]:text-[#64748b]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
