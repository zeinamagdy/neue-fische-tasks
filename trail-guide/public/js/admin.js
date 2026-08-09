

const modal = document.querySelector < HTMLModElement > ('#formModal')
console.log("mode",modal)
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const form = document.getElementById('modalForm');

// 1. OPEN MODAL & PRE-FILL FROM EXPRESS
openBtn.addEventListener('click', async () => {
    try {
        // Fetch latest user data from Express server
        // const trail = await trailModel.getTrailBySlug(slug)
        // if (trail !== undefined) {


            // Populate form fields
            // document.getElementById('username').value = data.name;
            // document.getElementById('email').value = data.email;

            // Show dialog
            modal.showModal();
        // }
    } catch (err) {
        console.error('Failed to load user data:', err);
    }
});

// // 2. CLOSE MODAL
// closeBtn.addEventListener('click', () => modal.close());

// // 3. SUBMIT FORM TO EXPRESS
// form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const updatedData = {
//         username: document.getElementById('username').value,
//         email: document.getElementById('email').value
//     };

//     try {
//         // Send PUT request to Express
//         const res = await fetch('/api/user', {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(updatedData)
//         });

//         if (res.ok) {
//             modal.close();
//             alert('Profile updated successfully!');
//         } else {
//             alert('Error updating profile');
//         }
//     } catch (err) {
//         console.error('Network error:', err);
//     }
// });