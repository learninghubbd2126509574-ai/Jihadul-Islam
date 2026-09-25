package com.unityearning.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Casino
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Work
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.unityearning.app.ui.screens.HomeScreen
import com.unityearning.app.ui.screens.LuckySpinScreen
import com.unityearning.app.ui.screens.ProfileScreen
import com.unityearning.app.ui.screens.WorkScreen
import com.unityearning.app.ui.theme.UnityEarningTheme

sealed class Screen(val route: String, val title: String, val icon: ImageVector) {
    object Home : Screen("home", "হোম", Icons.Default.Home)
    object Work : Screen("work", "কাজ", Icons.Default.Work)
    object Spin : Screen("spin", "স্পিন", Icons.Default.Casino)
    object Profile : Screen("profile", "প্রোফাইল", Icons.Default.Person)
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            UnityEarningTheme {
                MainApp()
            }
        }
    }
}

@Composable
fun MainApp() {
    var selectedScreen by remember { mutableStateOf<Screen>(Screen.Home) }
    val items = listOf(Screen.Home, Screen.Work, Screen.Spin, Screen.Profile)

    Scaffold(
        bottomBar = {
            NavigationBar {
                items.forEach { screen ->
                    NavigationBarItem(
                        icon = { Icon(screen.icon, contentDescription = screen.title) },
                        label = { Text(screen.title) },
                        selected = selectedScreen == screen,
                        onClick = { selectedScreen = screen }
                    )
                }
            }
        }
    ) { innerPadding ->
        Surface(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (selectedScreen) {
                Screen.Home -> HomeScreen()
                Screen.Work -> WorkScreen()
                Screen.Spin -> LuckySpinScreen()
                Screen.Profile -> ProfileScreen()
            }
        }
    }
}
