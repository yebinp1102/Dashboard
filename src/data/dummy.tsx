import { FiBarChart } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { TbDeviceAnalytics } from "react-icons/tb";
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';


export const links = [
  {
    title: '사업 소개',
    icon: <IoMdContacts />,
    links: [
      {
        name: '따릉이 소개',
        linkTo: 'introduction',
      },
      {
        name: '대여 방법',
        linkTo: 'howtorent',
      },
      {
        name: '반납 방법',
        linkTo: 'howtoreturn',
      },
      {
        name: '대여소 조회',
        linkTo: 'search/station',
      },
    ],
  },
  {
    title: '월별 통계',
    icon: <TbDeviceAnalytics />,
    links: [
      {
        name: '신규가입자',
        linkTo: 'test',
      },
      {
        name: '이용정보',
        linkTo: 'monlty/new_member',
      },
    ],
  },
];


export const earningData = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: '39,354',
    percentage: '-4%',
    title: 'Customers',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
  {
    icon: <BsBoxSeam />,
    amount: '4,396',
    percentage: '+23%',
    title: 'Products',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
  },
  {
    icon: <FiBarChart />,
    amount: '423,39',
    percentage: '+38%',
    title: 'Sales',
    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',
    pcColor: 'green-600',
  },
  {
    icon: <HiOutlineRefresh />,
    amount: '39,354',
    percentage: '-12%',
    title: 'Refunds',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
];

export const SparklineAreaData = [
  { x: 1, yval: 2 },
  { x: 2, yval: 6 },
  { x: 3, yval: 8 },
  { x: 4, yval: 5 },
  { x: 5, yval: 10 },

];