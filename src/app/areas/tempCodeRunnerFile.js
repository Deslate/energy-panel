].x, points[3].y],
                ['Z'],
            ]; // @ts-ignore
        
            attrs.path = this.parsePath(path);
            group.addShape('path', {
                attrs,
            });
        
            if (cfg.data.lastWeek) {
                const linePath = [
                ['M', points[2].x, points[2].y],
                ['L', points[3].x, points[3].y],
                ]; // 最后一周的多边形添加右侧边框
        
                group.addShape('path', {
                    attrs: {
                        path: this.parsePath(linePath),
                        lineWidth: 4,
                        stroke: '#404040',
                    },
                });
    
                if (cfg.data.