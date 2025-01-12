document.getElementById("poisson-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const lambda = parseFloat(document.getElementById("lambda").value);
    const k = parseInt(document.getElementById("k").value);

    if (isNaN(lambda) || isNaN(k) || lambda <= 0 || k < 0) {
        alert("Please enter valid values for λ and k.");
        return;
    }

    const response = await fetch("/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ lambda: lambda, k: k }),
    });

    const resultDiv = document.getElementById("result");
    const stepsDiv = document.getElementById("steps");
    const data = await response.json();

    if (data.success) {
        resultDiv.textContent = `P(X = ${k}) = ${data.result.toFixed(6)}`;
        
        // Update the steps section with LaTeX
        stepsDiv.innerHTML = `
            <strong>Langkah-langkah perhitungan:</strong><br>
            1. Gunakan rumus distribusi Poisson:<br>
            \\[
            P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}
            \\]<br>
            2. Substitusi nilai: \\(\\lambda = ${lambda}, k = ${k}\\)<br>
            \\[
            P(X = ${k}) = \\frac{${lambda}^${k} \\cdot e^{- ${lambda}}}{${k}!}
            \\]<br>
            3. Hitung hasil:<br>
            \\[
            P(X = ${k}) = ${data.result.toFixed(6)}
            \\]
        `;

        MathJax.typeset(); // Re-render LaTeX
    } else {
        resultDiv.textContent = "Input tidak valid. Coba lagi.";
        stepsDiv.innerHTML = "";
    }
});
