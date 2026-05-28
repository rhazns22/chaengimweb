import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Database,
  FileText,
  LayoutGrid,
  ListChecks,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Workflow,
} from 'lucide-react';

import appIcon from './assets/images/app_icon.png';
import screenHome from './assets/images/screens/home.png';
import screenDetail from './assets/images/screens/detail.png';
import screenProfile from './assets/images/screens/profile.png';
import screenRecommend from './assets/images/screens/recommend.png';
import screenBoard from './assets/images/screens/board.png';
import screenSchedule from './assets/images/screens/schedule.png';

type ScreenId = 'home' | 'detail' | 'profile' | 'recommend' | 'board' | 'schedule';

const appScreens = [
  {
    id: 'home',
    label: 'A. 홈',
    title: '홈',
    subtitle: '추천, 마감, 보드를 한 화면에서',
    description: '사용자가 오늘 확인해야 할 추천 혜택과 마감 임박 항목, 내 보드 현황을 첫 화면에서 확인합니다.',
    image: screenHome,
  },
  {
    id: 'detail',
    label: 'B. 혜택 상세',
    title: '혜택 상세',
    subtitle: '공공데이터를 질문형 구조로 정리',
    description: '대상, 지원 내용, 준비 서류를 사용자가 이해하기 쉬운 질문 단위로 나눠 보여줍니다.',
    image: screenDetail,
  },
  {
    id: 'profile',
    label: 'C. 프로필 설정',
    title: '프로필 설정',
    subtitle: '추천에 필요한 기본 조건 입력',
    description: '출생연도, 거주 지역, 현재 상태를 입력해 조건에 가까운 혜택을 찾는 기준으로 사용합니다.',
    image: screenProfile,
  },
  {
    id: 'recommend',
    label: 'D. 맞춤 추천',
    title: '맞춤 추천',
    subtitle: '조건 매칭 점수와 추천 이유',
    description: 'AI가 최종 대상 여부를 판단하지 않도록 제한하고, 조건 매칭 근거를 참고용 설명으로 제공합니다.',
    image: screenRecommend,
  },
  {
    id: 'board',
    label: 'E. 신청 보드',
    title: '신청 보드',
    subtitle: '저장한 혜택의 준비 상태 관리',
    description: '관심 혜택을 준비중, 신청완료 상태로 구분하고 체크리스트 진행률을 확인합니다.',
    image: screenBoard,
  },
  {
    id: 'schedule',
    label: 'F. 신청 일정',
    title: '신청 일정',
    subtitle: '마감일 중심 일정 확인',
    description: '저장한 혜택의 신청기한을 일정 형태로 정리해 마감 임박 항목을 빠르게 확인합니다.',
    image: screenSchedule,
  },
] satisfies Array<{
  id: ScreenId;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}>;

const overviewCards = [
  {
    icon: Search,
    title: '혜택 찾기',
    description: '흩어진 정부 혜택을 카테고리와 검색으로 탐색합니다.',
  },
  {
    icon: ClipboardCheck,
    title: '신청 준비',
    description: '관심 혜택을 저장하고 준비 상태와 체크리스트를 관리합니다.',
  },
  {
    icon: CalendarDays,
    title: '일정 관리',
    description: '마감일이 있는 혜택을 D-Day 기준으로 확인합니다.',
  },
];

const problemCards = ['정보가 흩어져 있음', '조건 판단이 어려움', '저장 후 관리가 어려움', '마감일을 놓치기 쉬움'];

const coreFeatures = [
  {
    eyebrow: '맞춤 추천',
    title: '내 조건에 맞는 혜택을 먼저 확인하세요.',
    description:
      '출생연도, 지역, 현재 상태 등 기본 정보를 바탕으로 조건에 가까운 혜택을 먼저 보여줍니다. AI 추천은 참고용이며 최종 자격은 공식 기관에서 확인해야 합니다.',
    image: screenRecommend,
  },
  {
    eyebrow: '혜택 상세',
    title: '대상과 지원 내용을 질문처럼 읽어보세요.',
    description:
      '공공데이터 원문을 그대로 나열하지 않고, 이 혜택은 무엇인지, 내가 대상인지, 무엇을 준비해야 하는지 순서대로 확인할 수 있게 정리했습니다.',
    image: screenDetail,
  },
  {
    eyebrow: '신청 보드',
    title: '관심 혜택은 신청 보드에서 관리하세요.',
    description: '저장한 혜택을 준비중, 신청완료 상태로 나누고 체크리스트 진행률을 확인할 수 있습니다.',
    image: screenBoard,
  },
  {
    eyebrow: '신청 일정',
    title: '마감일은 일정에서 놓치지 않게.',
    description: '저장한 혜택의 신청기한을 일정 형태로 정리해 마감 임박 항목을 빠르게 확인할 수 있습니다.',
    image: screenSchedule,
  },
];

const journeySteps = [
  '홈에서 추천 혜택 확인',
  '혜택 상세에서 대상/지원내용 확인',
  '관심 혜택 저장',
  '신청 보드에서 준비 상태 관리',
  '신청 일정에서 마감일 확인',
  '공식 사이트에서 최종 신청',
];

const aiSteps = [
  '사용자 프로필',
  'Rule-based Scoring',
  '조건 매칭 점수',
  'Gemini API 추천 이유 생성',
  '참고용 추천 결과',
  '공식 사이트 확인',
];

const techLayers = [
  { title: 'Frontend', items: 'React / TypeScript / Zustand / Tailwind', icon: LayoutGrid },
  { title: 'API Client', items: 'Axios / JWT Header', icon: Workflow },
  { title: 'Backend', items: 'Express / TypeScript / Auth Middleware', icon: ShieldCheck },
  { title: 'Database', items: 'Prisma / MySQL', icon: Database },
  { title: 'External', items: 'GOV24 API / Gemini API', icon: Sparkles },
];

const uxImprovements = [
  ['혜택 상세 정보 구조 개선', '공공데이터 원문 중심', '질문형 정보 구조'],
  ['AI 추천 문구 개선', '추천 점수', '조건 매칭 점수'],
  ['비회원 마이페이지 개선', '0건 / 설정 완료 / 설정됨', '로그인 후 확인 / 설정 / 관리'],
  ['회원가입 개선', '단순 입력 폼', '실시간 검증, 약관 동의, 버튼 비활성화'],
  ['오버레이 개선', '모달이 앱 컨테이너 밖으로 벗어남', 'max-width 430px 기준으로 정렬'],
];

const colors = [
  ['Primary Blue', '#5B78F0'],
  ['Background', '#F6F7FB'],
  ['Surface', '#FFFFFF'],
  ['Text Primary', '#2F3441'],
  ['Text Secondary', '#8B909E'],
  ['Border', '#ECEEF5'],
];

const components = ['Button', 'Benefit Card', 'Status Badge', 'Input', 'Bottom Navigation', 'Modal / BottomSheet', 'Toast', 'Empty State'];
const interactions = ['tap scale', 'page fade-up', 'modal slide-up', 'toast motion', 'count-up number'];

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
};

const fadeUpSmall = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOutExpo } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const phoneImageTransition = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: easeOutExpo } },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.2, ease: easeOutExpo } },
};

function SectionIntro({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto mb-14 max-w-3xl text-center' : 'mb-10 max-w-3xl'}>
      {eyebrow ? <p className="mb-4 text-sm font-bold text-primary-500">{eyebrow}</p> : null}
      <h2 className="whitespace-pre-line text-3xl font-extrabold leading-tight tracking-normal text-[#2F3441] sm:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 whitespace-pre-line text-base leading-8 text-[#6E7584] sm:text-lg">{description}</p> : null}
    </div>
  );
}

function PhoneMockup({ image, alt, className = '' }: { image: string; alt: string; className?: string }) {
  return (
    <div
      className={`mx-auto w-[238px] rounded-[2.55rem] bg-[#111827] p-[7px] shadow-[0_28px_70px_rgba(42,61,140,0.2)] sm:w-[282px] ${className}`}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.05rem] bg-white">
        <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
    </div>
  );
}

function CountUpNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      return;
    }

    let frameId = 0;
    const startTime = performance.now();
    const duration = 850;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, shouldReduceMotion, value]);

  return (
    <span ref={ref}>
      {shouldReduceMotion ? value : displayValue}
      {suffix}
    </span>
  );
}

function MotionLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`${className} focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200 md:hover:-translate-y-0.5`}
    >
      {children}
    </motion.a>
  );
}

function StaggerGrid({ children, className }: { children: React.ReactNode; className: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUpSmall} className={className}>
      {children}
    </motion.div>
  );
}

function FeatureScrollBlock({
  feature,
  index,
  onActive,
}: {
  feature: (typeof coreFeatures)[number];
  index: number;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.55 });

  useEffect(() => {
    if (isInView) onActive(index);
  }, [index, isInView, onActive]);

  return (
    <Reveal>
      <div ref={ref} className="flex min-h-[440px] flex-col justify-center py-10 lg:min-h-[560px]">
        <p className="mb-5 text-sm font-bold text-primary-500">{feature.eyebrow}</p>
        <h2 className="text-3xl font-extrabold leading-tight tracking-normal text-[#2F3441] sm:text-5xl">
          {feature.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-9 text-[#6E7584]">{feature.description}</p>
        <div className="mt-10 lg:hidden">
          <PhoneMockup image={feature.image} alt={`${feature.eyebrow} 화면`} />
        </div>
      </div>
    </Reveal>
  );
}

function StickyPhoneShowcase() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
      <div>
        {coreFeatures.map((feature, index) => (
          <FeatureScrollBlock key={feature.title} feature={feature} index={index} onActive={setActiveFeatureIndex} />
        ))}
      </div>
      <div className="sticky top-28 hidden min-h-[640px] items-center justify-center lg:flex">
        <AnimatePresence mode="wait">
          <motion.div key={coreFeatures[activeFeatureIndex].title} {...phoneImageTransition}>
            <PhoneMockup image={coreFeatures[activeFeatureIndex].image} alt={`${coreFeatures[activeFeatureIndex].eyebrow} 화면`} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedScreenId, setSelectedScreenId] = useState<ScreenId>('home');
  const shouldReduceMotion = useReducedMotion();
  const selectedScreen = useMemo(
    () => appScreens.find((screen) => screen.id === selectedScreenId) ?? appScreens[0],
    [selectedScreenId],
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#2F3441] antialiased">
      <header className="sticky top-0 z-50 border-b border-[#ECEEF5]/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
          <a href="#hero" className="flex items-center gap-3 font-extrabold text-[#2F3441]" aria-label="챙김 홈으로 이동">
            <img src={appIcon} alt="" className="h-9 w-9 rounded-xl shadow-sm" />
            <span className="text-lg">챙김</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#6E7584] lg:flex">
            <a href="#why" className="transition hover:text-primary-500">문제 정의</a>
            <a href="#features" className="transition hover:text-primary-500">기능</a>
            <a href="#screens" className="transition hover:text-primary-500">화면</a>
            <a href="#tech" className="transition hover:text-primary-500">기술 구조</a>
            <a href="#retrospective" className="transition hover:text-primary-500">회고</a>
          </nav>
          <MotionLink
            href="https://github.com/rhazns22"
            className="inline-flex items-center gap-2 rounded-full bg-[#2F3441] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-600"
            external
          >
            <Code2 className="h-4 w-4" />
            GitHub
          </MotionLink>
        </div>
      </header>

      <main>
        <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#F6F8FF] via-white to-white">
          <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <Reveal>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary-500 shadow-sm ring-1 ring-[#ECEEF5]">
                <Sparkles className="h-4 w-4" />
                정부 혜택 탐색 · 신청 준비 관리 · AI 조건 매칭
              </p>
              <h1 className="text-[34px] font-extrabold leading-[1.18] tracking-normal text-[#182033] sm:text-6xl lg:text-[68px]">
                놓치기 쉬운 정부 혜택,
                <br />
                이제 챙김이 정리해드릴게요.
              </h1>
              <p className="mt-7 max-w-2xl whitespace-pre-line text-lg leading-9 text-[#596273] sm:text-xl">
                {`나에게 맞는 혜택을 찾고,
신청 준비와 마감 일정까지 한 곳에서 관리하는
모바일 앱형 PWA 프로젝트입니다.`}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <MotionLink href="#screens" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-500 px-7 py-4 font-bold text-white shadow-[0_16px_36px_rgba(91,120,240,0.22)] transition hover:bg-primary-600">
                  앱 화면 보기
                  <ArrowRight className="h-5 w-5" />
                </MotionLink>
                <MotionLink href="#tech" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-[#2F3441] shadow-sm ring-1 ring-[#ECEEF5] transition hover:text-primary-600">
                  프로젝트 구조 보기
                  <ChevronRight className="h-5 w-5" />
                </MotionLink>
              </div>
            </Reveal>

            <motion.div
              className="relative"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
              animate={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            >
              <motion.div
                className="relative z-10"
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PhoneMockup image={screenHome} alt="챙김 홈 화면" />
              </motion.div>
              <div className="absolute left-0 top-10 hidden rounded-2xl bg-white px-5 py-4 shadow-[0_18px_45px_rgba(31,41,55,0.1)] ring-1 ring-[#ECEEF5] lg:block">
                <p className="text-xs font-bold text-[#8B909E]">추천 혜택</p>
                <p className="mt-1 text-2xl font-extrabold text-primary-500"><CountUpNumber value={3} suffix="건" /></p>
              </div>
              <div className="absolute right-3 top-32 hidden rounded-2xl bg-white px-5 py-4 shadow-[0_18px_45px_rgba(31,41,55,0.1)] ring-1 ring-[#ECEEF5] lg:block">
                <p className="text-xs font-bold text-[#8B909E]">마감 임박</p>
                <p className="mt-1 text-2xl font-extrabold text-[#E75656]"><CountUpNumber value={2} suffix="건" /></p>
              </div>
              <div className="absolute bottom-20 left-8 hidden rounded-2xl bg-white px-5 py-4 shadow-[0_18px_45px_rgba(31,41,55,0.1)] ring-1 ring-[#ECEEF5] lg:block">
                <p className="text-xs font-bold text-[#8B909E]">내 신청 보드</p>
                <p className="mt-1 text-2xl font-extrabold text-[#2F3441]"><CountUpNumber value={2} suffix="건" /></p>
              </div>
              <div className="mx-auto mt-8 grid max-w-sm grid-cols-3 gap-3 lg:hidden">
                {[
                  ['추천 혜택', 3],
                  ['마감 임박', 2],
                  ['내 신청 보드', 2],
                ].map(([label, value]) => (
                  <div key={label as string} className="rounded-2xl bg-white px-3 py-4 text-center shadow-sm ring-1 ring-[#ECEEF5]">
                    <p className="text-[11px] font-bold text-[#8B909E]">{label}</p>
                    <p className="mt-1 text-xl font-extrabold text-primary-500">
                      <CountUpNumber value={value as number} suffix="건" />
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="overview" className="bg-white px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro title={`정부 혜택 탐색부터 신청 준비까지\n한 번에 관리하세요.`} />
            <StaggerGrid className="grid gap-5 md:grid-cols-3">
              {overviewCards.map(({ icon: Icon, title, description }) => (
                <StaggerItem key={title}>
                  <div className="rounded-[2rem] bg-[#F8FAFF] p-8 ring-1 ring-[#ECEEF5] transition active:scale-[0.98] md:hover:-translate-y-1 md:hover:shadow-lg">
                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary-500 shadow-sm">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-extrabold">{title}</h3>
                    <p className="mt-4 text-base leading-7 text-[#6E7584]">{description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        <section id="why" className="bg-white px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <SectionIntro
                align="left"
                eyebrow="WHY"
                title={`혜택은 많지만,\n내게 필요한 혜택은 찾기 어렵습니다.`}
                description={`정부 혜택 정보는 여러 기관 사이트에 흩어져 있고,
신청 조건과 준비 서류, 마감 일정은 사용자가 직접 확인해야 합니다.
챙김은 이 과정을 더 쉽게 정리하기 위해 만들었습니다.`}
              />
            </Reveal>
            <StaggerGrid className="grid gap-4 sm:grid-cols-2">
              {problemCards.map((problem, index) => (
                <StaggerItem key={problem}>
                  <div className="rounded-[1.5rem] border border-[#ECEEF5] bg-white p-6 shadow-sm transition active:scale-[0.98] md:hover:-translate-y-1 md:hover:shadow-lg">
                    <span className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F3FF] text-sm font-extrabold text-primary-500">
                      {index + 1}
                    </span>
                    <p className="text-xl font-extrabold">{problem}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        <section id="features" className="bg-[#F6F7FB] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <StickyPhoneShowcase />
          </div>
        </section>

        <section id="screens" className="bg-white px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="SCREEN SHOWCASE"
              title="사용자 여정으로 보는 챙김 앱 화면"
              description={`실제 챙김 PWA에서 캡쳐한 핵심 화면을 사용자 여정 순서대로 정리했습니다.
카드를 선택하면 우측 iPhone 목업에 해당 실제 앱 화면이 표시됩니다.`}
            />
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="space-y-3">
                <span className="mb-4 inline-flex rounded-full bg-[#F0F3FF] px-4 py-2 text-sm font-bold text-primary-600">
                  실제 챙김 PWA 화면 캡쳐 기반
                </span>
                {appScreens.map((screen) => {
                  const active = screen.id === selectedScreenId;
                  return (
                    <motion.button
                      key={screen.id}
                      type="button"
                      onClick={() => setSelectedScreenId(screen.id)}
                      aria-selected={active}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className={`w-full rounded-2xl border bg-white p-5 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-100 ${
                        active
                          ? 'border-primary-300 shadow-md shadow-primary-100/60'
                          : 'border-[#ECEEF5] text-[#6E7584] hover:border-primary-200'
                      }`}
                    >
                      <p className={`text-sm font-bold ${active ? 'text-primary-500' : 'text-[#8B909E]'}`}>{screen.label}</p>
                      <h3 className="mt-2 text-xl font-extrabold">{screen.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6E7584]">{screen.subtitle}</p>
                    </motion.button>
                  );
                })}
              </div>
              <div className="p-2 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedScreen.id}
                    {...phoneImageTransition}
                    className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
                  >
                    <div>
                      <p className="text-sm font-bold text-primary-500">{selectedScreen.label}</p>
                      <h3 className="mt-3 text-3xl font-extrabold">{selectedScreen.title}</h3>
                      <p className="mt-4 text-base leading-8 text-[#6E7584]">{selectedScreen.description}</p>
                    </div>
                    <PhoneMockup image={selectedScreen.image} alt={`${selectedScreen.title} 화면`} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section id="flow" className="bg-[#F6F7FB] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro title="혜택을 찾는 순간부터 신청 준비까지" />
            <StaggerGrid className="grid gap-4 lg:grid-cols-6">
              {journeySteps.map((step, index) => (
                <StaggerItem key={step}>
                  <div className="relative rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ECEEF5]">
                    {index < journeySteps.length - 1 ? (
                      <motion.span
                        className="absolute left-1/2 top-full h-4 w-px origin-top bg-primary-200 lg:left-full lg:top-1/2 lg:h-px lg:w-4 lg:origin-left"
                        initial={{ scaleX: 0, scaleY: 0 }}
                        whileInView={{ scaleX: 1, scaleY: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: index * 0.08, ease: easeOutExpo }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-sm font-extrabold text-white">
                      {index + 1}
                    </span>
                    <p className="text-lg font-extrabold leading-7">{step}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        <section className="bg-[#F0F5FF] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro
              eyebrow="AI PRINCIPLE"
              title="AI가 최종 대상 여부를 판단하지 않도록 설계했습니다."
              description={`챙김의 AI 추천은 최종 대상 여부를 보장하는 기능이 아닙니다.
추천 후보는 백엔드의 Rule-based Scoring으로 계산하고,
Gemini API는 추천 이유를 이해하기 쉽게 설명하는 역할로 제한했습니다.`}
            />
            <StaggerGrid className="grid gap-3 lg:grid-cols-6">
              {aiSteps.map((step, index) => (
                <StaggerItem key={step}>
                  <div className="relative rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-primary-100">
                    {index < aiSteps.length - 1 ? (
                      <motion.span
                        className="absolute left-1/2 top-full h-3 w-px origin-top bg-primary-200 lg:left-full lg:top-1/2 lg:h-px lg:w-3 lg:origin-left"
                        initial={{ scaleX: 0, scaleY: 0 }}
                        whileInView={{ scaleX: 1, scaleY: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.4, delay: index * 0.08, ease: easeOutExpo }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F3FF] text-primary-500">
                      {index === aiSteps.length - 1 ? <Check className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                    </div>
                    <p className="text-sm font-extrabold leading-6">{step}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
            <p className="mt-10 rounded-[1.5rem] bg-primary-500 px-6 py-5 text-center text-lg font-extrabold text-white shadow-[0_18px_40px_rgba(91,120,240,0.22)]">
              AI는 판단자가 아니라, 이해를 돕는 설명 도구로 사용했습니다.
            </p>
          </div>
        </section>

        <section id="tech" className="bg-white px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionIntro eyebrow="TECH ARCHITECTURE" title="화면부터 데이터까지 직접 연결한 풀스택 MVP" />
            <div className="space-y-4">
              {techLayers.map(({ title, items, icon: Icon }, index) => (
                <Reveal key={title} className="flex flex-col gap-5 rounded-3xl border border-[#ECEEF5] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0F3FF] text-primary-500">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold">{title}</h3>
                      <p className="mt-1 text-[#6E7584]">{items}</p>
                    </div>
                  </div>
                  {index < techLayers.length - 1 ? <ArrowRight className="hidden h-5 w-5 text-[#B8BFCC] sm:block" /> : <BadgeCheck className="hidden h-5 w-5 text-primary-500 sm:block" />}
                </Reveal>
              ))}
            </div>
            <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['구현 API', 5, '개'],
                ['앱 화면', 6, '개'],
                ['QA viewport', 3, '종'],
                ['기술 스택', 7, '종'],
              ].map(([label, value, suffix]) => (
                <StaggerItem key={label as string}>
                  <div className="rounded-3xl bg-[#F8FAFF] p-6 text-center ring-1 ring-[#ECEEF5]">
                    <p className="text-sm font-bold text-[#8B909E]">{label}</p>
                    <p className="mt-3 text-4xl font-extrabold text-primary-500">
                      <CountUpNumber value={value as number} suffix={suffix as string} />
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        <section id="retrospective" className="bg-[#F6F7FB] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro eyebrow="UX IMPROVEMENTS" title="실제 화면을 보며 사용성을 개선했습니다." />
            <StaggerGrid className="grid gap-5 lg:grid-cols-5">
              {uxImprovements.map(([title, before, after]) => (
                <StaggerItem key={title}>
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#ECEEF5] transition active:scale-[0.98] md:hover:-translate-y-1 md:hover:shadow-lg">
                    <h3 className="min-h-14 text-lg font-extrabold leading-7">{title}</h3>
                    <div className="mt-6 space-y-3 text-sm leading-6">
                      <p><span className="font-bold text-[#D05B5B]">Before</span> {before}</p>
                      <p><span className="font-bold text-primary-500">After</span> {after}</p>
                      <p className="text-[#6E7584]">결과: 사용자가 다음 행동을 더 명확히 이해하도록 정리</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        <section id="design" className="bg-white px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionIntro eyebrow="DESIGN SYSTEM" title="신뢰감을 주는 블루 기반 디자인 시스템" />
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal className="rounded-[2rem] bg-[#F8FAFF] p-7 ring-1 ring-[#ECEEF5]">
                <div className="mb-6 flex items-center gap-3">
                  <Palette className="h-6 w-6 text-primary-500" />
                  <h3 className="text-2xl font-extrabold">Color</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {colors.map(([name, value]) => (
                    <div key={name} className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-[#ECEEF5]">
                      <span className="h-10 w-10 rounded-xl ring-1 ring-[#ECEEF5]" style={{ backgroundColor: value }} />
                      <div>
                        <p className="font-bold">{name}</p>
                        <p className="text-sm text-[#8B909E]">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal className="rounded-[2rem] bg-[#F8FAFF] p-7 ring-1 ring-[#ECEEF5]">
                <div className="mb-6 flex items-center gap-3">
                  <ListChecks className="h-6 w-6 text-primary-500" />
                  <h3 className="text-2xl font-extrabold">Components & Interaction</h3>
                </div>
                <StaggerGrid className="flex flex-wrap gap-3">
                  {components.map((component) => (
                    <StaggerItem key={component}>
                      <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#596273] ring-1 ring-[#ECEEF5]">
                        {component}
                      </span>
                    </StaggerItem>
                  ))}
                </StaggerGrid>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {interactions.map((interaction) => (
                    <div key={interaction} className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-[#ECEEF5]">
                      <Check className="h-5 w-5 text-primary-500" />
                      <span className="font-bold">{interaction}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="limitations" className="bg-[#F6F7FB] px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionIntro
              eyebrow="LIMITATIONS"
              title="확인해야 할 경계와 다음 단계"
              description={`챙김은 공식 기관의 최종 확인 절차를 대신하지 않습니다.
MVP 이후에는 공식 데이터 최신성 검증, 실제 기기 QA, 알림 고도화가 추가로 필요합니다.`}
            />
            <div className="grid gap-5 md:grid-cols-3">
              {[
                ['공식 확인 필요', '추천 결과는 참고용이며 실제 대상 여부와 신청 가능 여부는 공식 기관에서 확인해야 합니다.'],
                ['데이터 최신성', '공공 데이터 변경 주기와 API 응답 예외를 운영 기준으로 더 촘촘히 검증해야 합니다.'],
                ['실기기 QA', 'iOS Safari와 Android Chrome의 PWA 설치, 알림, 화면 높이 차이를 추가 확인해야 합니다.'],
              ].map(([title, description]) => (
                <Reveal key={title} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#ECEEF5]">
                  <FileText className="mb-8 h-7 w-7 text-primary-500" />
                  <h3 className="text-xl font-extrabold">{title}</h3>
                  <p className="mt-4 leading-7 text-[#6E7584]">{description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-500 to-[#3247C8] p-8 text-white shadow-[0_28px_70px_rgba(42,61,140,0.24)] sm:p-12 lg:grid-cols-[1fr_320px]">
            <Reveal>
              <img src={appIcon} alt="" className="mb-8 h-14 w-14 rounded-2xl bg-white/10" />
              <h2 className="text-3xl font-extrabold leading-tight sm:text-5xl">
                정부 혜택을 찾는 순간부터
                <br />
                신청 준비까지 더 쉽게.
              </h2>
              <p className="mt-6 max-w-2xl whitespace-pre-line text-lg leading-9 text-white/82">
                {`챙김은 복잡한 행정 정보를
사용자가 이해하기 쉬운 흐름으로 정리한
모바일 PWA 프로젝트입니다.`}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="https://chaengim.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-extrabold text-primary-600">
                  앱 데모 보기
                  <Smartphone className="h-5 w-5" />
                </a>
                <a href="https://github.com/rhazns22" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/12 px-6 py-4 font-extrabold text-white ring-1 ring-white/20">
                  GitHub 보기
                  <Code2 className="h-5 w-5" />
                </a>
                <a href="https://pjewep.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/12 px-6 py-4 font-extrabold text-white ring-1 ring-white/20">
                  포트폴리오 보기
                  <Bookmark className="h-5 w-5" />
                </a>
              </div>
            </Reveal>
            <Reveal className="hidden lg:block">
              <PhoneMockup image={screenHome} alt="챙김 앱 홈 화면" />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#ECEEF5] bg-white px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#8B909E] lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-bold text-[#2F3441]">챙김 PWA Case Study</p>
            <p className="mt-1">최종 대상 여부와 실제 신청 가능 여부는 공식 기관에서 확인해야 하는 포트폴리오 MVP입니다.</p>
          </div>
          <div className="flex flex-wrap gap-3 font-semibold">
            <a href="https://github.com/rhazns22" target="_blank" rel="noreferrer" className="transition hover:text-primary-500">GitHub</a>
            <a href="https://pjewep.vercel.app/" target="_blank" rel="noreferrer" className="transition hover:text-primary-500">Portfolio</a>
            <a href="mailto:pje698112@naver.com" className="transition hover:text-primary-500">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
