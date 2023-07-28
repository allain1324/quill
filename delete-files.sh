#!/bin/bash

# Xóa những file có đuôi theo chỉ định

file_extensions=".ts .d.ts .js.map"  # Định nghĩa các đuôi file cần xóa
folders=("blots" "core"  "formats" "modules" "test" "themes" "ui" ".git")  # Định nghĩa các thư mục cần xóa trong
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"  # Đường dẫn thư mục chứa script

# Hàm đệ quy để xóa tệp có đuôi chỉ định
function deleteFilesInDirectory() {
  local directory=$1
  for ext in $file_extensions; do
    find "$directory" -type f -name "*$ext" -exec rm -f {} +
  done
}

# Xóa các tệp trong thư mục gốc của script
deleteFilesInDirectory "$script_dir"

# Xóa các tệp trong các thư mục chỉ định
for folder in "${folders[@]}"; do
  full_folder_path="$script_dir/$folder"
  if [ -d "$full_folder_path" ]; then
    deleteFilesInDirectory "$full_folder_path"
  else
    echo "Thư mục $full_folder_path không tồn tại."
  fi
done

# Xóa những file và folder chỉ định
items_to_delete=(
  "_develop"
  ".github"
  "e2e"
  "test"
  "website"
  ".eslintignore"
  ".eslintrc.json"
  ".gitignore"
  ".npmignore"
  "babel.config.js"
  "CODE_OF_CONDUCT.md"
  "LICENSE"
  "package-lock.json"
  "playwright.config.ts"
  "tsconfig.json"
  "tsconfig.npm.json"
)  # Định nghĩa danh sách các tệp và thư mục cần xóa
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"  # Đường dẫn thư mục chứa script

# Xóa các tệp và thư mục trong thư mục gốc của script
for item in "${items_to_delete[@]}"; do
  full_item_path="$script_dir/$item"
  if [ -e "$full_item_path" ]; then
    if [ -f "$full_item_path" ]; then
      rm "$full_item_path"
      echo "Deleted file: $full_item_path"
    elif [ -d "$full_item_path" ]; then
      rm -r "$full_item_path"
      echo "Deleted folder: $full_item_path"
    fi
  else
    echo "Item $full_item_path không tồn tại."
  fi
done