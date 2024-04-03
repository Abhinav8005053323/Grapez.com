document.getElementById('convertBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = () => {
            const imgData = reader.result;
            const img = new Image();
            
            img.onload = () => {
                const pdf = new jsPDF();
                const width = pdf.internal.pageSize.getWidth();
                const height = pdf.internal.pageSize.getHeight();
                
                pdf.addImage(imgData, 'PNG', 0, 0, width, height);
                const output = document.getElementById('output');
                output.innerHTML = '<iframe width="100%" height="100%" src="' + pdf.output('datauristring') + '"></iframe>';
            };
            
            img.src = imgData;
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file.');
    }
});