// Функция для загрузки сотрудников и изделий из localStorage
function loadData() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];

    return { employees, products };
}

// Функция для обновления списка сотрудников и изделий на главной странице
function updateSelectOptions() {
    const { employees, products } = loadData();

    const employeeSelect = document.getElementById('employee');
    const productSelect = document.getElementById('product');

    employeeSelect.innerHTML = '';
    productSelect.innerHTML = '';

    employees.forEach((employee, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = employee;
        employeeSelect.appendChild(option);
    });

    products.forEach((product, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Функция для добавления нового изделия
document.getElementById('addProduct')?.addEventListener('click', function() {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;

    if (productName && productPrice) {
        const { products } = loadData();
        products.push({ name: productName, price: Number(productPrice) });
        localStorage.setItem('products', JSON.stringify(products));
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        updateProductList();
        updateSelectOptions();
    }
});

// Функция для добавления нового сотрудника
document.getElementById('addEmployee')?.addEventListener('click', function() {
    const employeeName = document.getElementById('employeeName').value;

    if (employeeName) {
        const { employees } = loadData();
        employees.push(employeeName);
        localStorage.setItem('employees', JSON.stringify(employees));
        document.getElementById('employeeName').value = '';
        updateEmployeeList();
        updateSelectOptions();
    }
});

// Функция для обновления списка изделий на странице управления изделиями
function updateProductList() {
    const { products } = loadData();
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price} руб.`;
        productList.appendChild(li);
    });
}

// Функция для обновления списка сотрудников на странице управления сотрудниками
function updateEmployeeList() {
    const { employees } = loadData();
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = '';
    employees.forEach(employee => {
        const li = document.createElement('li');
        li.textContent = employee;
        employeeList.appendChild(li);
    });
}

// Функция для расчета заработной платы
document.getElementById('calculate')?.addEventListener('click', function() {
    const employeeSelect = document.getElementById('employee');
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const resultDisplay = document.getElementById('result');

    const { products } = loadData();

    const selectedEmployee = employeeSelect.options[employeeSelect.selectedIndex].text;
    const selectedProduct = productSelect.value;
    const quantity = quantityInput.value;

    const totalSalary = products[selectedProduct].price * quantity;

    resultDisplay.textContent = `Сотрудник: ${selectedEmployee}, Сдельная заработная плата: ${totalSalary} руб.`;
});

// Инициализация данных и обновление списков на всех страницах
document.addEventListener('DOMContentLoaded', function() {
    updateSelectOptions();
    updateProductList();
    updateEmployeeList();
});
