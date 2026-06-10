// Frequency report icons — Tabler Icons (MIT) https://tabler.io/icons
// Fixed: replaced hand-drawn SVGs with @tabler/icons-react for consistent stroke icons.
// Fixed: icons read too large — smaller default size and stroke for section/dashboard use.

import type { ComponentType } from "react";
import {
  IconActivity,
  IconActivityHeartbeat,
  IconBarbell,
  IconCalendarEvent,
  IconFlame,
  IconHeartRateMonitor,
  IconLungs,
  IconMoon,
  IconRun,
  IconTemperature,
  IconWaveSine,
  IconWind,
  IconWritingSign,
  IconYoga,
} from "@tabler/icons-react";
import type { IconProps as TablerIconProps } from "@tabler/icons-react";

type IconProps = {
  className?: string;
  size?: number;
};

const STROKE = 1.5;

function tablerIcon(
  Icon: ComponentType<TablerIconProps>,
  { className = "", size = 18 }: IconProps,
) {
  return <Icon className={className} size={size} stroke={STROKE} aria-hidden />;
}

export function HeartRateIcon(props: IconProps) {
  return tablerIcon(IconHeartRateMonitor, props);
}

export function HrvIcon(props: IconProps) {
  return tablerIcon(IconActivityHeartbeat, props);
}

export function SleepIcon(props: IconProps) {
  return tablerIcon(IconMoon, props);
}

export function BreathIcon(props: IconProps) {
  return tablerIcon(IconLungs, props);
}

export function StepsIcon(props: IconProps) {
  return tablerIcon(IconActivity, props);
}

export function RecoveryIcon(props: IconProps) {
  return tablerIcon(IconWind, props);
}

export function PenProtocolIcon(props: IconProps) {
  return tablerIcon(IconWritingSign, props);
}

export function MeditationIcon(props: IconProps) {
  return tablerIcon(IconYoga, props);
}

export function CallIcon(props: IconProps) {
  return tablerIcon(IconCalendarEvent, props);
}

export function FrequencyWaveIcon(props: IconProps) {
  return tablerIcon(IconWaveSine, props);
}

export function CardioIcon(props: IconProps) {
  return tablerIcon(IconRun, props);
}

export function HiitIcon(props: IconProps) {
  return tablerIcon(IconFlame, props);
}

export function StrengthIcon(props: IconProps) {
  return tablerIcon(IconBarbell, props);
}

export function TemperatureIcon(props: IconProps) {
  return tablerIcon(IconTemperature, props);
}
