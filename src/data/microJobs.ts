/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MicroTask {
  id: string;
  titleBn: string;
  titleEn: string;
  reward: number; // e.g. 0.02 is ৳2, 0.05 is ৳5, 0.06 is ৳6, 0.10 is ৳10
  timeSec: number;
  iconName: string;
  bgColor: string;
  iconColor: string;
  completed: boolean;
  platform: string;
  maxTarget: number;
  completedCount: number;
}

export const generate100Tasks = (): MicroTask[] => {
  const PLATFORMS = [
    { nameBn: 'ফেসবুক', nameEn: 'Facebook', icon: 'Facebook', bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
    { nameBn: 'ইউটিউব', nameEn: 'YouTube', icon: 'Youtube', bgColor: 'bg-rose-50', iconColor: 'text-rose-600' },
    { nameBn: 'টেলিগ্রাম', nameEn: 'Telegram', icon: 'Send', bgColor: 'bg-sky-50', iconColor: 'text-sky-500' },
    { nameBn: 'হোয়াটসঅ্যাপ', nameEn: 'WhatsApp', icon: 'MessageSquare', bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { nameBn: 'টিকটক', nameEn: 'TikTok', icon: 'Video', bgColor: 'bg-slate-100', iconColor: 'text-slate-800' }
  ];

  const templates = [
    // Facebook
    [
      { bn: 'ফেসবুক পেজ লাইক করুন', en: 'Like Official Facebook Page', reward: 0.02, time: 3, target: 1000, completed: 300 },
      { bn: 'ফেসবুক পেজে সুন্দর কমেন্ট করুন', en: 'Comment on Facebook Page', reward: 0.05, time: 4, target: 1000, completed: 300 },
      { bn: 'ফেসবুক গ্রুপে জয়েন করুন', en: 'Join Facebook Group', reward: 0.02, time: 3, target: 1500, completed: 450 },
      { bn: 'ফেসবুক পেজ ফলো এবং রিভিউ দিন', en: 'Follow and review Facebook Page', reward: 0.06, time: 5, target: 800, completed: 240 },
      { bn: 'ফেসবুক ভিডিও ৩ মিনিট দেখুন এবং শেয়ার করুন', en: 'Watch Facebook video 3 mins and share', reward: 0.10, time: 8, target: 2000, completed: 600 }
    ],
    // YouTube
    [
      { bn: 'ইউটিউব চ্যানেল সাবস্ক্রাইব করুন', en: 'Subscribe YouTube Channel', reward: 0.02, time: 3, target: 1000, completed: 350 },
      { bn: 'ইউটিউব ভিডিও ৫ মিনিট দেখুন', en: 'Watch YouTube Video (5 mins)', reward: 0.06, time: 6, target: 1200, completed: 400 },
      { bn: 'ইউটিউব ভিডিও লাইক ও সুন্দর কমেন্ট করুন', en: 'Like and Comment on YouTube Video', reward: 0.05, time: 4, target: 1000, completed: 300 },
      { bn: 'ইউটিউব ভিডিও ওয়াচ ও সাবস্ক্রাইব', en: 'Watch Video and Subscribe Channel', reward: 0.10, time: 7, target: 500, completed: 150 }
    ],
    // Telegram
    [
      { bn: 'টেলিগ্রাম গ্রুপে জয়েন করুন', en: 'Join Telegram Community Group', reward: 0.02, time: 3, target: 2000, completed: 850 },
      { bn: 'টেলিগ্রাম চ্যানেলে জয়েন করুন এবং রিয়্যাক্ট দিন', en: 'Join Telegram channel and React to posts', reward: 0.05, time: 4, target: 1500, completed: 450 }
    ],
    // WhatsApp
    [
      { bn: 'হোয়াটসঅ্যাপ আর্নিং গ্রুপে জয়েন করুন', en: 'Join WhatsApp Earning Support Group', reward: 0.02, time: 3, target: 1000, completed: 300 },
      { bn: 'হোয়াটসঅ্যাপ অফিশিয়াল চ্যানেলে যুক্ত হোন', en: 'Join Official WhatsApp Channel', reward: 0.05, time: 4, target: 800, completed: 240 }
    ],
    // TikTok
    [
      { bn: 'টিকটক একাউন্ট ফলো করুন', en: 'Follow TikTok Account', reward: 0.02, time: 3, target: 1200, completed: 360 },
      { bn: 'টিকটক ভিডিও লাইক ও ৫ সেকেন্ড দেখুন', en: 'Like TikTok video and watch for 5s', reward: 0.05, time: 5, target: 1500, completed: 450 }
    ]
  ];

  const list: MicroTask[] = [];
  let currentId = 1;

  while (list.length < 100) {
    const platformIdx = (currentId - 1) % PLATFORMS.length;
    const platform = PLATFORMS[platformIdx];
    const platformTemplates = templates[platformIdx];
    const templateIdx = Math.floor((currentId - 1) / PLATFORMS.length) % platformTemplates.length;
    const template = platformTemplates[templateIdx];

    const taskNum = currentId;
    const targetOffset = (taskNum * 7) % 300;
    const completedOffset = (taskNum * 13) % 200;
    const maxTarget = template.target + targetOffset;
    const completedCount = Math.min(template.completed + completedOffset, maxTarget - 10);

    // Vary rewards between 2, 5, 6, 10 BDT (0.02, 0.05, 0.06, 0.10)
    const rewardChoices = [0.02, 0.05, 0.06, 0.10];
    const reward = rewardChoices[(taskNum + templateIdx) % rewardChoices.length];

    // Platforms name variations
    const suffixBn = ` (টাস্ক #${taskNum})`;
    const suffixEn = ` (Task #${taskNum})`;

    list.push({
      id: `micro_task_${taskNum}`,
      titleBn: `${template.bn}${suffixBn}`,
      titleEn: `${template.en}${suffixEn}`,
      reward,
      timeSec: template.time,
      iconName: platform.icon,
      bgColor: platform.bgColor,
      iconColor: platform.iconColor,
      completed: false,
      platform: platform.nameEn,
      maxTarget,
      completedCount
    });

    currentId++;
  }

  return list;
};

export const getLocalMicroTasks = (): MicroTask[] => {
  const data = localStorage.getItem('ue_micro_tasks_list');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      // fallback
    }
  }
  const fresh = generate100Tasks();
  localStorage.setItem('ue_micro_tasks_list', JSON.stringify(fresh));
  return fresh;
};

export const saveLocalMicroTasks = (tasks: MicroTask[]) => {
  localStorage.setItem('ue_micro_tasks_list', JSON.stringify(tasks));
};
