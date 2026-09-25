package com.unityearning.app.model

data class TaskLog(
    val id: String,
    val jobId: String,
    val jobTitleBn: String,
    val jobTitleEn: String,
    val rewardTaka: Double,
    val date: String,
    val status: String = "Approved"
)

data class UserProfile(
    val fullName: String = "Habiba Akter",
    val username: String = "habiba_2026",
    val email: String = "habiba.akter@gmail.com",
    val phone: String = "+880 1712-345678",
    val balance: Double = 3450.0,
    val totalIncome: Double = 66400.0,
    val tasksCompleted: Int = 632,
    val level: String = "Gold Rank",
    val points: Int = 3250,
    val joinedDate: String = "2026-07-01"
)
