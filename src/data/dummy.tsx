import { FiAlertCircle, FiBarChart } from 'react-icons/fi';
import { BsBoxSeam } from 'react-icons/bs';
import { IoMdApps, IoMdContacts } from 'react-icons/io';
import { TbDeviceAnalytics } from "react-icons/tb";
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { HiOutlineRefresh } from 'react-icons/hi';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { IoLockClosedOutline, IoLockOpenOutline } from 'react-icons/io5';
import { LuParkingCircle } from "react-icons/lu";


export const links = [
  {
    title: '사업 소개',
    icon: <IoMdContacts />,
    links: [
      {
        name: '따릉이 소개',
        linkTo: 'home',
      },
      {
        name: '대여 방법',
        linkTo: 'rent',
      },
      {
        name: '반납 / 임시장금 방법',
        linkTo: 'return',
      },
      {
        name: '대여소 조회',
        linkTo: 'search/station',
      },
    ],
  },
  {
    title: '통계',
    icon: <TbDeviceAnalytics />,
    links: [
      {
        name: '고장 및 대여 이력 (일별)',
        linkTo: 'day/report',
      },
      {
        name: '이용정보 (월별)',
        linkTo: 'monthly/usage',
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

export const rentStepsData = [
  {
    icon: <IoMdApps />,
    title: "따릉이 앱 실행",
    subText: "따릉이 앱을 실행하고 이용권을 결제합니다. 이용권은 정기권, 일일권, 단체권이 있습니다.",
    bgColor: 'bg-primary-500',
    color: 'text-primary-500',
  },
  {
    icon: <FiAlertCircle />,
    title: "자전거 점검",
    subText: "주행할 자전거를 고르고 타이어와 브레이크, 체인을 확인합니다.",
    bgColor: 'bg-primary-dark-green',
    color: 'text-primary-dark-green',
  },
  {
    icon: <FaArrowRotateRight />,
    title: "대여하기",
    subText: "<대여하기>를 누르고 단말기 QR코드를 스캔합니다. 단말기는 따릉이 뒷바퀴 상단부에 있습니다.",
    bgColor: 'bg-primary-orange',
    color: 'text-primary-orange',
  },
  {
    icon: <IoLockOpenOutline />,
    title: "잠금장치 풀기",
    subText: "잠금장치가 열리면 자전거를 거치대에서 분리합니다. 이때 잠금장치를 열지 않고 따릉이를 옮길 시 경보음이 울릴 수 있습니다.",
    bgColor: 'bg-primary-yellow',
    color: 'text-primary-yellow',
  },
  {
    icon: <FaRegCheckCircle />,
    title: "대여 완료",
    subText: "이용 수칙을 준수하여 따릉이를 이용합니다. (음주 운전 금지, 주행 중 휴대전화 사용 금지, 이어폰 사용 금지",
    bgColor: 'bg-primary-red-orange',
    color: 'text-primary-red-orange',
  }
]


export const returnStepsData = [
  {
    icon: <LuParkingCircle />,
    title: "주차하기",
    subText: "가까운 대여소를 방문해 자전거를 거치대 위에 올려놓습니다.",
    bgColor: 'bg-primary-500',
    color: 'text-primary-500',
  },
  {
    icon: <IoLockClosedOutline />,
    title: "잠금하기",
    subText: "잠금장치를 당겨서 잠급니다.",
    bgColor: 'bg-primary-dark-green',
    color: 'text-primary-dark-green',
  },
  {
    icon: <FaRegCheckCircle />,
    title: "확인하기",
    subText: "반납되었다는 안내 음성이 나온 후 전송되는 알림 메세지를 확인합니다.",
    bgColor: 'bg-primary-orange',
    color: 'text-primary-orange',
  },
  {
    icon: <IoLockClosedOutline />,
    title: "임시잠금",
    subText: "대여소가 아니라도 임시잠금을 하고 자리 비울 수 있습니다. 잠금장치를 당기고 따릉이 앱에서 임시잠금을 확인합니다. ",
    bgColor: 'bg-primary-yellow',
    color: 'text-primary-yellow',
  },
  {
    icon: <IoLockOpenOutline />,
    title: "임시잠금 해제",
    subText: "따릉이 앱에서 '임시잠금 해제' 버튼을 눌러 잠금을 해제하고 다시 따릉이를 이용합니다.",
    bgColor: 'bg-primary-red-orange',
    color: 'text-primary-red-orange',
  }
]