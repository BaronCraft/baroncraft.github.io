import os
import numpy as np
from PIL import Image
import nbtlib
from collections import defaultdict
import math

def get_region_files(world_path):
    """Находим все файлы регионов"""
    region_path = os.path.join(world_path, "region")
    if not os.path.exists(region_path):
        raise Exception("Папка region не найдена!")
    
    return [f for f in os.listdir(region_path) if f.endswith(".mca")]

def load_region(region_file):
    """Загружаем регион (упрощенная версия)"""
    # Здесь должна быть реализация чтения .mca файлов
    # Для примера создадим случайную карту
    return np.random.randint(0, 256, (512, 512))

def generate_tile(region_data, x, y, tile_size=256):
    """Генерируем один тайл"""
    start_x = x * tile_size
    start_y = y * tile_size
    end_x = start_x + tile_size
    end_y = start_y + tile_size
    
    tile_data = region_data[start_y:end_y, start_x:end_x]
    
    # Преобразуем в цвета (упрощенно)
    colors = {
        0: (0, 0, 255),      # Вода
        1: (34, 139, 34),    # Трава
        2: (139, 69, 19),    # Земля
        255: (255, 255, 255) # Снег
    }
    
    img_array = np.zeros((tile_size, tile_size, 3), dtype=np.uint8)
    
    for i in range(tile_size):
        for j in range(tile_size):
            height_val = tile_data[i, j] % len(colors)
            img_array[i, j] = colors.get(height_val, (0, 0, 0))
    
    return Image.fromarray(img_array)

def main():
    world_path = "world"  # Путь к папке мира
    output_dir = "tiles"
    
    os.makedirs(output_dir, exist_ok=True)
    
    region_files = get_region_files(world_path)
    
    for region_file in region_files[:1]:  # Берем первый регион для примера
        region_data = load_region(region_file)
        
        # Генерируем тайлы для разных zoom уровней
        for zoom in range(4):
            zoom_dir = os.path.join(output_dir, str(zoom))
            os.makedirs(zoom_dir, exist_ok=True)
            
            tiles_count = 2 ** zoom
            tile_size = 512 // tiles_count
            
            for x in range(tiles_count):
                for y in range(tiles_count):
                    tile = generate_tile(region_data, x, y, tile_size)
                    tile.save(os.path.join(zoom_dir, f"{x}_{y}.jpg"), quality=85)

if __name__ == "__main__":
    main()
