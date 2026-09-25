package com.unityearning.app.data

import com.unityearning.app.model.TaskLog
import com.unityearning.app.model.UserProfile

object AppRepository {
    val initialProfile = UserProfile(
        fullName = "Habiba Akter",
        username = "habiba_2026",
        email = "habiba.akter@gmail.com",
        phone = "+880 1712-345678",
        balance = 3450.0,
        totalIncome = 66400.0,
        tasksCompleted = 632,
        level = "Gold Rank",
        points = 3250,
        joinedDate = "2026-07-01"
    )

    // Strictly fixed 40 professional task logs
    val fixedTaskLogs: List<TaskLog> = (0 until 40).map { i ->
        val type = i % 3
        val titleBn = when (type) {
            0 -> "ভিডিও এডিটিং কাজ: রিলস ও টিকটক শর্টস এডিট"
            1 -> "ফর্ম ফিল আপ: কাস্টমার ডাটা এন্ট্রি"
            else -> "ইমেইল সেল: মার্কেটিং কনভার্সন"
        }
        val titleEn = when (type) {
            0 -> "Video Editing: Reels & TikTok Shorts Edit"
            1 -> "Form Fillup: Customer Data Entry"
            else -> "Email Sale: Marketing Conversion"
        }
        val reward = when (type) {
            0 -> 200.0
            1 -> 100.0
            else -> 50.0
        }
        val hour = 10 + (i / 4)
        val minute = 10 + (i * 3 % 50)
        val day = 20 + (i % 7)
        TaskLog(
            id = "log-fixed-$i",
            jobId = "fixed-job-$i",
            jobTitleBn = titleBn,
            jobTitleEn = titleEn,
            rewardTaka = reward,
            date = "2026-07-$day, ${String.format("%02d:%02d", hour, minute)} AM",
            status = "Approved"
        )
    }
}
