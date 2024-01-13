// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use window_vibrancy::{ apply_vibrancy, NSVisualEffectMaterial};

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let window = app.get_window("main").unwrap();

      #[cfg(target_os = "macos")]
      apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, Some(16.0))
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
