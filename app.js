//Listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e){
    calculateResults();
    e.preventDefault();
});

//Calculate results (function code)
function calculateResults(){
     //UI variables
    const amountUIE = document.getElementById("amount");
    const interestUIE = document.getElementById("interest");
    const yearsUIE = document.getElementById("years");
    const monthlyPaymentUIE = document.getElementById("monthly-payment");
    const totalPaymentUIE = document.getElementById("total-payment");
    const totalInterestUIE = document.getElementById("total-interest");

    const principal = parseFloat(amountUIE.value);  //Turning the loan amount inputted into a decimal
    const calculatedInterest = parseFloat(interestUIE.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearsUIE.value) * 12;

    //Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPaymentUIE.value = monthly.toFixed(2);
        totalPaymentUIE.value = (monthly * calculatedPayments).toFixed(2);
        totalInterestUIE.value = ((monthly * calculatedPayments)-principal).toFixed(2);
        
        //Show results
        document.getElementById("results").style.display = "block";
    } else {
        showError("Please check your numbers");
    }
}

//Show Error (function code)
function showError(error){
    //Hide results
    document.getElementById("results").style.display = "none";
    const errorDiv = document.createElement("div");

    //Get elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    //Add class
    errorDiv.className = "alert alert-danger";

    //Create text node & append to div element
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv, heading);

    //Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

//Clear error
function clearError(){
    document.querySelector(".alert").remove();
}