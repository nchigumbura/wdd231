document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.querySelector('form');
    const timestampField = document.getElementById('timestamp');

    if (joinForm && timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const viewBenefitsLinks = document.querySelectorAll('.view-benefits-link');
    const closeButtons = document.querySelectorAll('.close-modal-button');
    const membershipModals = document.querySelectorAll('.membership-modal');
    const membershipCards = document.querySelectorAll('.membership-card');

    membershipCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
        }, 100 * index);
    });

    viewBenefitsLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = link.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });

    membershipModals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            const dialogDimensions = modal.getBoundingClientRect();
            if (
                event.clientX < dialogDimensions.left ||
                event.clientX > dialogDimensions.right ||
                event.clientY > dialogDimensions.bottom ||
                event.clientY < dialogDimensions.top
            ) {
                modal.close();
            }
        });
    });

    const dataDisplayDiv = document.getElementById('data-display');

    if (dataDisplayDiv) {
        const urlParams = new URLSearchParams(window.location.search);

        document.getElementById('display-fname').textContent = urlParams.get('fname') || 'N/A';
        document.getElementById('display-lname').textContent = urlParams.get('lname') || 'N/A';
        document.getElementById('display-email').textContent = urlParams.get('email') || 'N/A';
        document.getElementById('display-phone').textContent = urlParams.get('phone') || 'N/A';
        document.getElementById('display-bizname').textContent = urlParams.get('bizname') || 'N/A';
        document.getElementById('display-timestamp').textContent = urlParams.get('timestamp') ? new Date(urlParams.get('timestamp')).toLocaleString() : 'N/A';
    }
});