import { HTMLProps } from "react";
import { TbInfoHexagonFilled } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiTrail } from "react-icons/gi";
import { FaBus } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import { GiSpy } from "react-icons/gi";
import { LuCalendarHeart } from "react-icons/lu";
import { GiRobe } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io";
import { PiHandHeartFill } from "react-icons/pi";
import { IoCalendar } from "react-icons/io5";
import { HiHome } from "react-icons/hi2";
import { FaRegSnowflake } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { FaMapPin } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";

type IconProps = {
  name: string;
  className?: HTMLProps<HTMLElement>["className"];
};

const CustomIcon = (props: IconProps) => {
  const { name, ...svgProps } = props;

  const Icons: Record<IconProps["name"], any> = {
    infoModuleIcon: <TbInfoHexagonFilled {...svgProps} />,
    scheduleModuleIcon: <IoCalendar {...svgProps} />,
    crewModuleIcon: <FaPeopleGroup {...svgProps} />,
    trailsModuleIcon: <GiTrail {...svgProps} />,
    filesModuleIcon: <IoDocumentText {...svgProps} />,
    poliswipeModuleIcon: <PiHandHeartFill {...svgProps} />,
    matchesModuleIcon: <BsPeopleFill {...svgProps} />,
    redirectModuleIcon: <IoLogoFacebook {...svgProps} />,
    coursesModuleIcon: <FaPenNib {...svgProps} />,
    mapModuleIcon: <FaMapPin {...svgProps} />,

    ModuleIcon: <HiHome {...svgProps} />,
    SunDayIcon: <FaBus {...svgProps} />,
    MonDayIcon: <GiMicrophone {...svgProps} />,
    TueDayIcon: <GiSpy {...svgProps} />,
    WedDayIcon: <LuCalendarHeart {...svgProps} />,
    ThuDayIcon: <GiRobe {...svgProps} />,
    FriDayIcon: <FaHome {...svgProps} />,
    // MainPageIcon: <FaRegSnowflake {...svgProps} />,
  };

  return Icons[name];
};

export default CustomIcon;
