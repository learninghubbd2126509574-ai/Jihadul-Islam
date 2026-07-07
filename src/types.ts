/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Job {
  id: string;
  titleEn: string;
  titleBn: string;
  tag?: string; // 'POPULAR' | 'NEW' | 'HIGH PAY' etc.
  iconName: string; // Lucide icon name
  bgColor: string; // CSS bg class for icon container
  iconColor: string; // CSS text color for icon
  rewardEn: string;
  rewardBn: string;
  estimatedTimeEn: string;
  estimatedTimeBn: string;
  difficultyEn: string;
  difficultyBn: string;
  shortDescBn: string;
  shortDescEn: string;
  longDescBn: string;
  longDescEn: string;
  instructionsBn: string[];
  instructionsEn: string[];
  skillsRequiredEn: string[];
  skillsRequiredBn: string[];
}

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  address: string;
  avatarUrl: string;
  balance: number; // Demo earnings
  totalIncome: number; // Total money earned so far
  tasksCompleted: number;
  level: string;
  joinedDate: string;
}

export interface TaskLog {
  id: string;
  jobId: string;
  jobTitleBn: string;
  jobTitleEn: string;
  reward: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Rejected';
}

export interface ShopItem {
  id: string;
  nameBn: string;
  nameEn: string;
  price: number;
  descBn: string;
  descEn: string;
  iconName: string;
  purchased: boolean;
  benefitBn: string;
  benefitEn: string;
}
