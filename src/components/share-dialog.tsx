import { FaFacebook, FaFacebookMessenger, FaInstagram, FaTwitter, FaWhatsapp, FaCopy } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ShareOption = {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  className?: string;
};

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
    const currentUrl = window.location.href;

    const shareOptions: ShareOption[] = [
        {
          icon: FaFacebook,
          label: "Facebook",
          onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank'),
          className: "bg-[#1877F2] hover:bg-[#0d6efd]"
        },
        {
          icon: FaInstagram,
          label: "Instagram",
          onClick: () => window.open(`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`, '_blank'),
        //   onClick: () => {
        //     toast.info("Direct Instagram sharing not available. Link copied to clipboard!");
        //     navigator.clipboard.writeText(currentUrl);
        //   },
          className: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90"
        },
        {
          icon: FaWhatsapp,
          label: "WhatsApp",
          onClick: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`, '_blank'),
          className: "bg-[#25D366] hover:bg-[#128C7E]"
        },
        {
          icon: FaCopy,
          label: "Copy Link",
          onClick: () => {
            navigator.clipboard.writeText(currentUrl);
            toast.success("Link copied to clipboard!");
          },
          className: "bg-gray-600 hover:bg-gray-700"
        },
        {
          icon: IoMdMail,
          label: "Email",
          onClick: () => window.open(`mailto:?subject=Check this out&body=${encodeURIComponent(currentUrl)}`, '_blank'),
          className: "bg-[#EA4335] hover:bg-[#D93025]"
        },
        {
          icon: FaTwitter,
          label: "Twitter",
          onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`, '_blank'),
          className: "bg-black hover:bg-gray-900"
        },
        {
          icon: FaFacebookMessenger,
          label: "Messenger",
          onClick: () => window.open(`https://www.messenger.com/t/?link=${encodeURIComponent(window.location.href)}`, '_blank'),
        //   onClick: () => window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(currentUrl)}&app_id=YOUR_APP_ID`, '_blank'),
          className: "bg-[#0099FF] hover:bg-[#0088FF]"
        }
      ];

      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Partilhar este imóvel</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {shareOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="default"
                  className={`w-full flex items-center justify-center gap-2 text-white ${option.className}`}
                  onClick={option.onClick}
                >
                  <option.icon className="w-4 h-4" />
                  <span>{option.label}</span>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      );
}