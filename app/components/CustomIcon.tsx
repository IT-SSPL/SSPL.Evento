import { HTMLProps } from "react";
import { TbInfoHexagon } from "react-icons/tb";
import { GrSchedule } from "react-icons/gr";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiTrail } from "react-icons/gi";
import { FaBus } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import { GiSpy } from "react-icons/gi";
import { LuCalendarHeart } from "react-icons/lu";
import { GiRobe } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaRegSnowflake } from "react-icons/fa";

type IconProps = {
  name: string;
  className?: HTMLProps<HTMLElement>["className"];
};

const CustomIcon = (props: IconProps) => {
  const { name, ...svgProps } = props;

  const Icons: Record<IconProps["name"], any> = {
    infoModuleIcon: <TbInfoHexagon {...svgProps} />,
    scheduleModuleIcon: <GrSchedule {...svgProps} />,
    crewModuleIcon: <FaPeopleGroup {...svgProps} />,
    trailsModuleIcon: <GiTrail {...svgProps} />,
    filesModuleIcon: <HiOutlineDocumentText {...svgProps} />,
    SunDayIcon: <FaBus {...svgProps} />,
    MonDayIcon: <GiMicrophone {...svgProps} />,
    TueDayIcon: <GiSpy {...svgProps} />,
    WedDayIcon: <LuCalendarHeart {...svgProps} />,
    ThuDayIcon: <GiRobe {...svgProps} />,
    FriDayIcon: <FaHome {...svgProps} />,
    MainPageIcon: <FaRegSnowflake {...svgProps} />,
  };

  return Icons[name];
};

export default CustomIcon;
