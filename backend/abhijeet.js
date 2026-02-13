const abhijeetDialogues = [
    "Mai Senior Inspector Abhijeet bol raha hu. CID se.",
    "Daya, darwaza tod do!",
    "Tumhe phaansi hogi!",
    "Kuch toh gadbad hai.",
    "Yeh khoon tumne kiya hai!",
    "Boss, mujhe lagta hai ki ye suicide nahi, murder hai.",
    "Jhoot mat bolo! Hamein sab pata hai.",
    "Tumhe humare saath bureau chalna padega.",
    "Iska matlab samjhe Daya? Daal mein kuch kaala hai."
];

function getAbhijeetDialogue() {
    const randomIndex = Math.floor(Math.random() * abhijeetDialogues.length);
    return abhijeetDialogues[randomIndex];
}

module.exports = { getAbhijeetDialogue };
