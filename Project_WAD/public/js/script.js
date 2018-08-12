$(function(){
   // for contact-us form
    submitContactForm();
});

function submitContactForm(){
    $(document).on('focus','#emailAddress',(e) => {
        $('#err').hide();
    });
    $(document).on('focus','#comments',(e) => {
        $('#err').hide();
    });

    $(document).on('click','#contactFormSubmit',(e)=>{
        e.preventDefault();
        $('#err').hide();
        var email = $('#emailAddress').val();
        var comments = $('#comments').val();
        if(email.length == 0){
            $('#err').html(`<div class="alert alert-danger" role="alert">Please enter Email Address</div>`);
            $('#err').show();
            return;
        }
        if(!isEmailValid(email)){
            $('#err').html(`<div class="alert alert-danger" role="alert">Invalid Email Address</div>`);
            $('#err').show();
            return;
        }

        if(comments.length < 5){
            $('#err').html(`<div class="alert alert-danger" role="alert">Comments should be atleast 5 characters long.</div>`);
            $('#err').show();
            return;
        }
        $("#contact-form").html(`<div class="alert alert-success" role="alert">Your form has been submitted successfully.</div>`);
    })
}

function isEmailValid(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}


function deleteProduct(id){
    $.ajax({
        url: '/deleteProduct',
        type: "POST",
        data : {id},
        success : () => {
            $('#'+id).remove();
            alert('Product added successfully');
        },
        error: () => {
            alert('Some Error Occured!');
        }
    })

}

function toggle(id){
    let product =  $('#'+id.toString()+"info");
    if(product.is(':visible')){
        product.hide();
    }
    else{
        product.show();
    }
}

function deleteShop(id){
    $.ajax({
        url: '/deleteShop',
        type: "POST",
        data : {id},
        success : () => {
            $('#'+id).remove();
            alert('Product added successfully');
        },
        error: () => {
            alert('Some Error Occured!');
        }
    })
}


function addShop(obj){
    $('#err').hide();
    let email = $('#email').val();
    let shopName = $('#shopName').val();
    let phone = $('#phone').val();
    let category = $('#category').val();
    let address = $('#address').val();

    if(shopName.length < 5){
        $('#err').html(`<div class="alert alert-danger" role="alert">Invalid Shop Name.</div>`);
        $('#err').show();
        return;
    }
    if(address.length < 5){
        $('#err').html(`<div class="alert alert-danger" role="alert">Invalid Address.</div>`);
        $('#err').show();
        return;
    }
    if(phone.length < 9){
        $('#err').html(`<div class="alert alert-danger" role="alert">Invalid Phone.</div>`);
        $('#err').show();
        return;
    }
    if(category.length < 5){
        $('#err').html(`<div class="alert alert-danger" role="alert">Invalid Category.</div>`);
        $('#err').show();
        return;
    }
    if(!isEmailValid(email)){
        $('#err').html(`<div class="alert alert-danger" role="alert">Invalid Email.</div>`);
        $('#err').show();
        return;
    }


    $.ajax({
        url: '/newShop',
       type: "POST",
        data : {shopName,email,phone,category,address},
        success : () => {
            alert('Shop added successfully');
        },
        error: () => {
            alert('Some Error Occured!');
        }
    })

}

function addProduct(){
    let price = $('#price').val();
    let productName = $('#productName').val();
    let image = $('#image').val();
    let category = $('#category').val();
   if(productName.length < 5){
        $('#err').html(`<div class="alert alert-danger" role="alert">Invalid Product Name.</div>`);
        $('#err').show();
        return;
    }
    if(category.length < 5){
        $('#err').html(`<div class="alert alert-danger" role="alert">Invalid Category.</div>`);
        $('#err').show();
        return;
    }
    if(price.length < 1){
        $('#err').html(`<div class="alert alert-danger" role="alert">Invalid Price.</div>`);
        $('#err').show();
        return;
    }
    if(image.length < 5){
        $('#err').html(`<div class="alert alert-danger" role="alert">Invalid image url.</div>`);
        $('#err').show();
        return;
    }
    $.ajax({
        url: '/newProduct',
        type: "POST",
        data : {productName,price,category,image},
        success : () => {
            alert('Product added successfully');
        },
        error: () => {
            alert('Some Error Occured!');
        }
    })
}

function clearError(){
    $('#err').hide();
    $('#err').html('');
    $('#errModal').hide();
    $('#errModal').html('');
}


function editProduct(product){
    $('#productId').val(product.id);
    $('#productName').val(product.productName);
    $('#price').val(product.price);
    $('#category').val(product.category);
    $('#image').val(product.image);
    $('#editForm').modal('show');
}

function editProductBtn(){
    let id = $('#productId').val();
    let price = $('#price').val();
    let productName = $('#productName').val();
    let image = $('#image').val();
    let category = $('#category').val();
   if(productName.length < 5){
        $('#errModal').html(`<div class="alert alert-danger" role="alert">Invalid Product Name.</div>`);
        $('#errModal').show();
        return;
    }
    if(category.length < 5){
        $('#errModal').html(`<div class="alert alert-danger" role="alert">Invalid Category.</div>`);
        $('#errModal').show();
        return;
    }
    if(price.length < 1){
        $('#errModal').html(`<div class="alert alert-danger" role="alert">Invalid Price.</div>`);
        $('#errModal').show();
        return;
    }
    if(image.length < 5){
        $('#errModal').html(`<div class="alert alert-danger" role="alert">Invalid image url.</div>`);
        $('#errModal').show();
        return;
    }
    $.ajax({
        url: '/editProduct',
        type: "POST",
        data : {id,productName,price,category,image},
        success : () => {
            alert('Product has edited successfully');
            window.location.href = '/';
        },
        error: () => {
            alert('Some Error Occured!');
        }
    })

}

function editShop(shop){
    $('#shopId').val(shop.id);
    $('#shopName').val(shop.shopName);
    $('#address').val(shop.address);
    $('#category').val(shop.category);
    $('#phone').val(shop.phone);
    $('#email').val(shop.email);
    $('#editForm').modal('show');
}


function editShopBtn(){
    $('#errModal').hide();
    let email = $('#email').val();
    let shopName = $('#shopName').val();
    let phone = $('#phone').val();
    let category = $('#category').val();
    let address = $('#address').val();
    let id = $('#shopId').val();
    if(shopName.length < 5){
        $('#errModal').html(`<div class="alert alert-danger" role="alert">Invalid Shop Name.</div>`);
        $('#errModal').show();
        return;
    }
    if(address.length < 5){
        $('#errModal').html(`<div class="alert alert-danger" role="alert">Invalid Address.</div>`);
        $('#errModal').show();
        return;
    }
    if(phone.length < 9){
        $('#errModal').html(`<div class="alert alert-danger" role="alert">Invalid Phone.</div>`);
        $('#errModal').show();
        return;
    }
    if(category.length < 5){
        $('#errModal').html(`<div class="alert alert-danger" role="alert">Invalid Category.</div>`);
        $('#errModal').show();
        return;
    }
    if(!isEmailValid(email)){
        $('#errModal').html(`<div class="alert alert-danger" role="alert">Invalid Email.</div>`);
        $('#errModal').show();
        return;
    }


    $.ajax({
        url: '/editShop',
        type: "POST",
        data : {id,shopName,email,phone,category,address},
        success : () => {
            alert('Shop added successfully');
            window.location.href = '/shops'
        },
        error: () => {
            alert('Some Error Occured!');
        }
    })

}