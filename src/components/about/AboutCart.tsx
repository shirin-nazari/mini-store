import type { LucideIcon } from "lucide-react";

type AboutCart = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const AboutCart = ({ icon: Icon, title, description }: AboutCart) => {
  return (
    <div className="flex flex-col items-center text-center  gap-4 px-4 py-6 transition bg-gray-50 w-full  text-gray-800 rounded-xl hover:bg-gray-100">
      <Icon size={40} />
      <h2 className="font-bold text-xl text-gray-900">{title}</h2>
      <p className="font-semibold text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default AboutCart;
