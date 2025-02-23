export function keyEvents(player, keys) {
    document.addEventListener('keydown', (e) => {
        if (e.key in keys) {
            keys[e.key] = true;
            e.preventDefault();
            player.is_moving = true;
        }
        if (e.key === ' ' && !player.is_jumping) {
            e.preventDefault();
            player.is_jumping = true;
        }
    })
    document.addEventListener('keyup', (e) => {
        if (e.key in keys) {
            keys[e.key] = false;
        }
    
        if (e.key === ' ') {
            player.is_jumping = false;
        }
    
    });
}