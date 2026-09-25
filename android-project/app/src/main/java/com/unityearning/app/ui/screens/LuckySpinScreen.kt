package com.unityearning.app.ui.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Casino
import androidx.compose.material.icons.filled.CurrencyExchange
import androidx.compose.material.icons.filled.Stars
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.unityearning.app.data.AppRepository

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LuckySpinScreen() {
    val profile = AppRepository.initialProfile
    var isSpinning by remember { mutableStateOf(false) }
    var rotation by remember { mutableStateOf(0f) }
    var showExchangeDialog by remember { mutableStateOf(false) }

    val animatedRotation by animateFloatAsState(
        targetValue = rotation,
        animationSpec = tween(durationMillis = 3500, easing = FastOutSlowInEasing),
        finishedListener = { isSpinning = false }
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("লাকি স্পিন হুইল", fontWeight = FontWeight.Bold, fontSize = 18.sp) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .background(Color(0xFFF8FAFC))
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Points header
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column {
                        Text("আপনার মোট পয়েন্ট (ফিক্সড)", fontSize = 12.sp, color = Color(0xFF64748B))
                        Text(
                            text = "${profile.points} Pts",
                            fontSize = 22.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFFD97706)
                        )
                    }
                    Button(
                        onClick = { showExchangeDialog = true },
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB)),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Icon(Icons.Default.CurrencyExchange, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("পয়েন্ট এক্সচেঞ্জ", fontSize = 12.sp)
                    }
                }
            }

            // Spin Wheel Graphic
            Box(
                modifier = Modifier
                    .size(240.dp)
                    .rotate(animatedRotation)
                    .background(Color(0xFF1E293B), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Surface(
                    modifier = Modifier.size(100.dp),
                    shape = CircleShape,
                    color = Color(0xFF2563EB)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Text(
                            text = "SPIN",
                            color = Color.White,
                            fontWeight = FontWeight.Black,
                            fontSize = 18.sp
                        )
                    }
                }
            }

            // Spin Action Button
            Button(
                onClick = {
                    if (!isSpinning) {
                        isSpinning = true
                        rotation += 1440f + (0..360).random()
                    }
                },
                enabled = !isSpinning,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(54.dp),
                shape = RoundedCornerShape(14.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF059669))
            ) {
                Icon(Icons.Default.Casino, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = if (isSpinning) "স্পিন হচ্ছে..." else "স্পিন করুন",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }

        if (showExchangeDialog) {
            AlertDialog(
                onDismissRequest = { showExchangeDialog = false },
                title = { Text("পয়েন্ট এক্সচেঞ্জ") },
                text = {
                    Column {
                        Text("আপনার অবশিষ্ট পয়েন্ট: ${profile.points} (স্থির)")
                        Spacer(modifier = Modifier.height(8.dp))
                        Text("১০০ পয়েন্ট = ৳১০ টাকা মেইন ব্যালেন্স")
                    }
                },
                confirmButton = {
                    TextButton(onClick = { showExchangeDialog = false }) {
                        Text("ঠিক আছে")
                    }
                }
            )
        }
    }
}
