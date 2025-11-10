class MinecraftMap {
    constructor() {
        this.tileSize = 256;
        this.zoom = 1;
        this.maxZoom = 4;
        this.minZoom = 0;
        this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.isDragging = false;
        this.lastX = 0;
        this.lastY = 0;
        
        this.tileContainer = document.getElementById('tile-container');
        this.map = document.getElementById('map');
        this.coordinates = document.getElementById('coordinates');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.render();
        this.updateCoordinates();
    }
    
    setupEventListeners() {
        // Кнопки зума
        document.getElementById('zoom-in').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoom-out').addEventListener('click', () => this.zoomOut());
        
        // Колесо мыши для зума
        this.map.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -1 : 1;
            this.zoomToPoint(this.zoom + delta, e.clientX, e.clientY);
        });
        
        // Перетаскивание
        this.map.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.lastX = e.clientX;
            this.lastY = e.clientY;
            this.map.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            
            const deltaX = e.clientX - this.lastX;
            const deltaY = e.clientY - this.lastY;
            
            this.x += deltaX;
            this.y += deltaY;
            
            this.lastX = e.clientX;
            this.lastY = e.clientY;
            
            this.render();
            this.updateCoordinates();
        });
        
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.map.style.cursor = 'grab';
        });
        
        // Сенсорные события для мобильных устройств
        this.setupTouchEvents();
    }
    
    setupTouchEvents() {
        let touchStart = { x: 0, y: 0 };
        
        this.map.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                touchStart.x = e.touches[0].clientX;
                touchStart.y = e.touches[0].clientY;
            }
        });
        
        this.map.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                e.preventDefault();
                const touch = e.touches[0];
                const deltaX = touch.clientX - touchStart.x;
                const deltaY = touch.clientY - touchStart.y;
                
                this.x += deltaX;
                this.y += deltaY;
                
                touchStart.x = touch.clientX;
                touchStart.y = touch.clientY;
                
                this.render();
                this.updateCoordinates();
            }
        });
    }
    
    zoomIn() {
        if (this.zoom < this.maxZoom) {
            this.zoomTo(this.zoom + 1);
        }
    }
    
    zoomOut() {
        if (this.zoom > this.minZoom) {
            this.zoomTo(this.zoom - 1);
        }
    }
    
    zoomTo(newZoom) {
        this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom));
        this.scale = Math.pow(2, this.zoom);
        this.render();
        this.updateCoordinates();
    }
    
    zoomToPoint(newZoom, x, y) {
        const oldZoom = this.zoom;
        newZoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom));
        
        if (oldZoom === newZoom) return;
        
        // Вычисляем смещение для зума к точке
        const rect = this.map.getBoundingClientRect();
        const relativeX = x - rect.left - this.x;
        const relativeY = y - rect.top - this.y;
        
        this.zoom = newZoom;
        this.scale = Math.pow(2, this.zoom);
        
        const zoomFactor = Math.pow(2, newZoom - oldZoom);
        this.x = x - rect.left - (relativeX * zoomFactor);
        this.y = y - rect.top - (relativeY * zoomFactor);
        
        this.render();
        this.updateCoordinates();
    }
    
    render() {
        this.tileContainer.innerHTML = '';
        this.tileContainer.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
        
        // Вычисляем видимую область
        const visibleTiles = this.getVisibleTiles();
        
        // Загружаем видимые тайлы
        visibleTiles.forEach(tile => {
            this.loadTile(tile.x, tile.y);
        });
    }
    
    getVisibleTiles() {
        const tiles = [];
        const tilesPerSide = Math.pow(2, this.zoom);
        
        // Вычисляем границы видимой области в координатах тайлов
        const startX = Math.floor((-this.x) / (this.tileSize * this.scale));
        const startY = Math.floor((-this.y) / (this.tileSize * this.scale));
        const endX = Math.ceil((window.innerWidth - this.x) / (this.tileSize * this.scale));
        const endY = Math.ceil((window.innerHeight - this.y) / (this.tileSize * this.scale));
        
        for (let x = Math.max(0, startX); x < Math.min(tilesPerSide, endX); x++) {
            for (let y = Math.max(0, startY); y < Math.min(tilesPerSide, endY); y++) {
                tiles.push({ x, y });
            }
        }
        
        return tiles;
    }
    
    loadTile(x, y) {
        const img = new Image();
        img.className = 'tile';
        img.src = `tiles/${this.zoom}/${x}_${y}.jpg`;
        
        img.style.left = `${x * this.tileSize}px`;
        img.style.top = `${y * this.tileSize}px`;
        img.style.width = `${this.tileSize}px`;
        img.style.height = `${this.tileSize}px`;
        
        this.tileContainer.appendChild(img);
    }
    
    updateCoordinates() {
        // Преобразуем координаты экрана в игровые координаты
        const gameX = Math.floor((-this.x) / this.scale);
        const gameZ = Math.floor((-this.y) / this.scale);
        
        this.coordinates.textContent = `X: ${gameX}, Z: ${gameZ}`;
    }
}

// Инициализация карты когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new MinecraftMap();
});
