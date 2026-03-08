function toggleButton(value) {
    const allBtn = document.getElementById('all-btn');
    const openBtn = document.getElementById('open-btn');
    const closedBtn = document.getElementById('closed-btn');
    
    if (value === 'all-btn') {
        allBtn.classList.add('btn-primary');
        openBtn.classList.remove('btn-primary');
        closedBtn.classList.remove('btn-primary');
    } else if (value === 'open-btn') {
        openBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        closedBtn.classList.remove('btn-primary');
    } else if (value === 'closed-btn') {
        closedBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        openBtn.classList.remove('btn-primary');
    }
}
toggleButton('all-btn');