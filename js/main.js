$(document).ready(function () {
  $(".fa-align-justify").click(function () {
    $(".list-container").css("left", "0")
    $(".fa-align-justify").addClass("d-none")
    $(this).siblings().removeClass("d-none")
    $(".link-1, .link-2 , .link-3, .link-4, .link-5").css("transform", "translateY(0)");

  })
  $(".closing").click(function () {
    $(".list-container").css("left", "-220px")
    $(".fa-align-justify").removeClass("d-none")
    $(this).addClass("d-none")
    $(".link-1, .link-2 , .link-3, .link-4, .link-5").css("transform", "translateY(1000px)");
    console.log("jidhidkgh")
  })

  function switchIcons() {
    $(".closing").addClass("d-none")
    $(".fa-align-justify").removeClass("d-none")
    $(".list-container").css("left", "-220px")

  }
  let catList = [];
  let mealList = [];
  let tagList = [];
  let searchName = "chicken"
  let searchLetter = "e"
  let keyWords = ["chicken_breast", "beef", "chicken", "salmon", "bacon", "bread", "cinnamon"]
  async function defaultData() {
    $(".loading").fadeIn(100)

    let rand = keyWords[Math.floor(Math.random() * keyWords.length)]
    console.log(rand)

    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${rand}`)
    let res = await req.json()
    mealList = res.meals
    displayMeals()
    $(".loading").fadeOut(100)

  }
  defaultData()
  $("#searcByName").keyup(function () {
    searchName = $(this).val()
    searchByName(searchName)
  })
  $("#searchByLetter").keyup(function () {
    searchLetter = $(this).val()
    searchByFirstLetter(searchLetter)
  })
  async function searchByName(searchName) {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`)
    let res = await req.json()
    console.log(res)
    mealList = res.meals
    displayMeals()
  }
  async function searchByFirstLetter(searchLetter) {
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetter}`)
    let res = await req.json()
    mealList = res.meals
    displayMeals()
  }
  async function getCategoris() {
    $(".inner-loading").removeClass("d-none")
    $(".inner-loading").fadeIn(100)
    let req = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let res = await req.json();
    catList = res.categories
    console.log(res)
    displayCategories()
    mealsByClick()
    $(".inner-loading").fadeOut(100)

  }
  async function getMeals(category) {
    $(".inner-loading").removeClass("d-none")
    $(".inner-loading").fadeIn(100)
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let res = await req.json()
    mealList = res.meals
    displayMeals()
    $(".inner-loading").fadeOut(100)

  }
  async function getArea() {
    $(".inner-loading").removeClass("d-none")
    $(".inner-loading").fadeIn(100)
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let res = await req.json()
    let areas = res.meals
    displayArea(areas)
    mealAreaByClick()
    $(".inner-loading").fadeOut(100)

  }
  async function gtMealByArea(area) {
    $(".inner-loading").removeClass("d-none")
    $(".inner-loading").fadeIn(100)
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let res = await req.json()
    console.log(res)
    mealList = res.meals;
    displayMeals()
    $(".inner-loading").fadeOut(100)

  }
  async function getIngrediants() {
    $(".inner-loading").removeClass("d-none")
    $(".inner-loading").fadeIn(100)
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let res = await req.json()
    let ingList = res.meals.slice(0, 20)
    displayIngrediants(ingList)
    $(".inner-loading").fadeOut(100)

  }
  function getIngMealByClick() {
    $(".ing").click(function () {
      let ing = $(this).find("h2").text()
      getIngMeal(ing)
    })
  }
  async function getIngMeal(ing) {
    $(".inner-loading").removeClass("d-none")
    $(".inner-loading").fadeIn(100)
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
    let res = await req.json()
    mealList = res.meals;
    displayMeals()
    $(".inner-loading").fadeOut(100)


  }
  function displayCategories() {
    catCart = ``
    for (const cat of catList) {
      catCart += `<div class="col-lg-3 col-md-4">
                <div class="position-relative overflow-hidden figCard">
                  <figure>
                  <img src="${cat.strCategoryThumb}" class="w-100" alt="">
                </figure>
                <figcaption class="position-absolute text-center meals d-flex flex-column justify-content-center align-items-center" >
                <h2 class=" ms-2" id="catmeal">${cat.strCategory}</h2>
                <p class="fw-light">${cat.strCategoryDescription.slice(0, 50)}...</p>
                </figcaption>
                </div>
              </div>`
    }
    $("#data").html(catCart)
    mealsByClick()
  }
  function displayArea(areas) {
    let areasCart = ``
    for (const area of areas) {
      areasCart += `<div class="col-lg-3 col-md-4">
                <div class="d-flex justify-content-center align-items-center flex-column area">
                  <i class="fa-solid fa-city fa-3x text-danger"></i>
                <h2 id="" class="mt-2 text-white" >${area.strArea}</h2>
                </div>
              </div>`
    }
    $("#data").html(areasCart)
  }
  function displayIngrediants(ingList) {
    ingCart = ``
    for (const ing of ingList) {
      ingCart += `<div class="col-lg-3 col-md-4">
                <div class="d-flex shadow-lg align-items-center flex-column ing">
                  <i class="fa-solid fa-bowl-food fa-3x"></i>
                  <h2 id="" class="mt-2 text-center text-white fs-3" >${ing.strIngredient}</h2>
                  <p class="mt-2 text-white text-center">${ing.strDescription.slice(0, 90)}...</p>
                </div>
              </div>`
    }
    $("#data").html(ingCart)
    getIngMealByClick()
  }
  function mealsByClick() {
    $(".meals").click(function () {
      let category = $(this).find("h2").text()
      getMeals(category)
    })
  }
  function mealAreaByClick() {
    $(".area").click(function () {
      let area = $(this).find("h2").text()
      gtMealByArea(area)
    })
  }
  function displayMeals() {
    mealsCart = ``
    for (const meal of mealList) {
      mealsCart += `<div class="col-lg-3 col-md-4">
                <div class="position-relative overflow-hidden figCard">
                  <figure>
                  <img src="${meal.strMealThumb}" class="w-100" alt="meal">
                </figure>
                <figcaption class="position-absolute meal" data-id =${meal.idMeal} >
                <h3 id="catmeal" >${meal.strMeal}</h3>
                </figcaption>
                </div>
              </div>`
    }
    if ($("#data").hasClass("d-none")) {
      $("#searchData").html(mealsCart)
      recipeByClick()
    } else {
      $("#data").html(mealsCart)
      recipeByClick()
    }
  }
  function recipeByClick() {
    $(".meal").click(function () {
      let id = $(this).attr("data-id");
      getDesc(id)
    })
  }
  async function getDesc(id) {
    $(".inner-loading").removeClass("d-none")
    $(".inner-loading").fadeIn(100)
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let res = await req.json()
    let desc = res.meals[0]
    console.log(res.meals[0])
    displayRecipe(desc)
    $(".inner-loading").fadeOut(100)

    // let me = new Map(desc)
    // console.log(me)
  }
  function displayRecipe(desc) {
    let recipes = Object.entries(desc).slice(9, 29)
    let amount = Object.entries(desc).slice(29, 49)
    console.log(amount)
    console.log(recipes)
    let recipeCart = ``
    recipes.forEach(function (item, index) {
      if (item[1] != "") {
        recipeCart += `<li class="my-2 mx-1 p-1 alert alert-success rounded ">${amount[index][1] + " " + item[1]}</li>`
      }
    });

    if (desc.strTags != null) {
      tagList = desc.strTags.split(",")
    }
    let tagCart = ``
    for (const tag of tagList) {
      tagCart += `<li class="my-2 mx-1 p-1 alert alert-danger rounded ">${tag}</li>`
    }
    let cart = `<div class="col-md-4 text-white">
                  <div>
                    <img src="${desc.strMealThumb}" class="w-100" alt="">
                    <h2 class="mealTitle">${desc.strMeal}</h2>
                  </div>
                </div>
                <div class="col-md-8 text-white">
                  <div class="ms-3">
                    <h2>Instructions:</h2>
                    <p class="fw-light mb-0 ">${desc.strInstructions}</p>
                    <h6 class="my-3">Area : <span class="fw-light">${desc.strArea}</span></h6>
                    <h6>Category : <span class="fw-light">${desc.strCategory}</span></h6>
                    <h3>Recipes:</h3>
                    <ul class="list-unstyled d-flex justify-content-strat flex-wrap recipes">
                      ${recipeCart}
                    </ul>
                    <h3>Tags:</h3>
                    <ul class="list-unstyled d-flex justify-content-strat flex-wrap tags">
                      ${tagCart}
                    </ul>
                    <a href="${desc.strSource}" class="btn btn-success text-white" target="_blank">Source</a>
                    <a href="${desc.strYoutube}" class="btn youtube" target="_blank">Youtube</a>
                  </div>
                </div>`
    $("#data").html(cart)

  }
  $(".link-1").click(function () {
    $(".searchSection").removeClass("d-none")
    $("#data").html("")
    $(".contact").addClass("d-none")
    switchIcons()



  })
  $(".link-2").click(function () {
    getCategoris()
    $(".searchSection").addClass("d-none")
    $("#data").removeClass("d-none")
    $(".contact").addClass("d-none")
    switchIcons()



  })
  $(".link-3").click(function () {
    getArea()
    $(".searchSection").addClass("d-none")
    $("#data").removeClass("d-none")
    $(".contact").addClass("d-none")
    switchIcons()



  })
  $(".link-4").click(function () {
    getIngrediants()
    $(".searchSection").addClass("d-none")
    $("#data").removeClass("d-none")
    $(".contact").addClass("d-none")
    switchIcons()



  })
  $(".link-5").click(function () {
    $(".searchSection").addClass("d-none")
    $(".contact").removeClass("d-none")
    $("#data").addClass("d-none")
    switchIcons()


  })
  $(".fa-share-alt").click(function () {
    $(".share").removeClass("d-none")

  })
  $(".share").click(function (e) {
    let el = document.querySelector(".share")
    if (e.target == el) {
      $(".share").addClass("d-none")
      console.log("did9")
    }
  })
  function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
  }
  $(".clipboard").click(function () {
    copyToClipboard($(".link"))
    console.log("dkhdn")
    setTimeout(function () {
      $(".alert-secondary").removeClass("d-none")
    }, 100)
    setTimeout(function () {
      $(".alert-secondary").addClass("d-none")
    }, 2000)
  })
  let nameVal = ``
  let emailVal = ``
  let phoneVal = ``
  let ageVal = ``
  let passVal = ``
  let rePassVal = ``
  let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  let ageRegex = /^(100|[1-9][8-9][0-9]?)$/
  let phoneRegex = /^([\+][2])?([0][1])[(1|0|2|5)][0-9]{8}$/
  let emailRegex = /^[a-zA-Z0-9]{2,10}@[a-zA-Z]{2,6}\.[a-zA-Z]{2,7}/
  let nameRegex = /^[a-zA-Z]{2,15}$/
  // flags
  let nameFlag = false
  let emailFlag = false
  let phoneFlag = false
  let ageFlag = false
  let passFlag = false
  let rePassFlag = false
  function valid() {
    $("#name").keyup(function () {
      nameVal = $("#name").val().trim()
      if (nameRegex.test(nameVal)) {
        $("#name").addClass("valid")
        $("#name").removeClass("invalid")
        $(this).siblings(".fa-xmark").addClass("d-none")
        $(this).siblings(".fa-check").removeClass("d-none")
        $(this).parent().siblings().addClass("d-none")
        nameFlag = true
      } else if (nameVal == "") {
        $("#name").addClass("invalid")
        $("#name").removeClass("valid")
        $(this).siblings(".fa-xmark").removeClass("d-none")
        $(this).siblings(".fa-check").addClass("d-none")
        $(this).parent().siblings().removeClass("d-none")
        $(this).parent().siblings().text("This field Cannot be empty.")
        nameFlag = false
      } else {
        $("#name").addClass("invalid")
        $("#name").removeClass("valid")
        $(this).siblings(".fa-xmark").removeClass("d-none")
        $(this).siblings(".fa-check").addClass("d-none")
        $(this).parent().siblings().removeClass("d-none")
        $(this).parent().siblings().text("Special Characters and Numbers not allowed and your name should be between [2,15] char")
        nameFlag = false
      }

    })

    $("#email").keyup(function () {
      emailVal = $("#email").val().trim()
      if (emailRegex.test(emailVal)) {
        $("#email").addClass("valid")
        $("#email").removeClass("invalid")
        $(this).siblings(".fa-xmark").addClass("d-none")
        $(this).siblings(".fa-check").removeClass("d-none")
        $(this).parent().siblings().addClass("d-none")
        emailFlag = true
      } else if (emailVal == "") {
        $("#email").addClass("invalid")
        $("#email").removeClass("valid")
        $(this).siblings(".fa-xmark").removeClass("d-none")
        $(this).siblings(".fa-check").addClass("d-none")
        $(this).parent().siblings().removeClass("d-none")
        $(this).parent().siblings().text("This field Cannot be empty.")
        emailFlag = false
      } else {
        $("#email").addClass("invalid")
        $("#email").removeClass("valid")
        $(this).siblings(".fa-xmark").removeClass("d-none")
        $(this).siblings(".fa-check").addClass("d-none")
        $(this).parent().siblings().removeClass("d-none")
        $(this).parent().siblings().text("Enter valid email. *Ex: xxx@yyy.zzz")
        emailFlag = false
      }

    })

    $("#phone").keyup(function () {
      phoneVal = $("#phone").val()
      if (phoneRegex.test(phoneVal)) {
        $("#phone").addClass("valid")
        $("#phone").removeClass("invalid")
        $(this).siblings(".fa-xmark").addClass("d-none")
        $(this).siblings(".fa-check").removeClass("d-none")
        $(this).parent().siblings().addClass("d-none")
        phoneFlag = true
      } else if (phoneVal == "") {
        $("#phone").addClass("invalid")
        $("#phone").removeClass("valid")
        $(this).siblings(".fa-xmark").removeClass("d-none")
        $(this).siblings(".fa-check").addClass("d-none")
        $(this).parent().siblings().removeClass("d-none")
        $(this).parent().siblings().text("This field Cannot be empty.")
        phoneFlag = fals
      } else {
        $("#phone").addClass("invalid")
        $("#phone").removeClass("valid")
        $(this).siblings(".fa-xmark").removeClass("d-none")
        $(this).siblings(".fa-check").addClass("d-none")
        $(this).parent().siblings().removeClass("d-none")
        $(this).parent().siblings().text("Enter valid Phone Number")
        phoneFlag = false
      }

    })


    $("#age").keyup(function () {
      ageVal = $("#age").val()
      if (ageRegex.test(ageVal)) {
        $("#age").addClass("valid")
        $("#age").removeClass("invalid")
        $(this).siblings(".fa-xmark").addClass("d-none")
        $(this).siblings(".fa-check").removeClass("d-none")
        $(this).parent().siblings().addClass("d-none")
        ageFlag = true
      } else if (ageVal == "") {
        $("#age").addClass("invalid")
        $("#age").removeClass("valid")
        $(this).siblings(".fa-xmark").removeClass("d-none")
        $(this).siblings(".fa-check").addClass("d-none")

        $(this).parent().siblings().removeClass("d-none")
        $(this).parent().siblings().text("This field Cannot be empty.")
        ageFlag = false
      } else {
        $("#age").addClass("invalid")
        $("#age").removeClass("valid")
        $(this).siblings(".fa-xmark").removeClass("d-none")
        $(this).siblings(".fa-check").addClass("d-none")
        $(this).parent().siblings().removeClass("d-none")
        $(this).parent().siblings().text("Enter valid Age")
        ageFlag = false
      }

    })


    $("#pass").keyup(function () {
      passVal = $("#pass").val().trim()
      if (passRegex.test(passVal)) {
        $("#pass").addClass("valid")
        $("#pass").removeClass("invalid")
        $(this).siblings(".fa-xmark").addClass("d-none")
        $(this).siblings(".fa-check").removeClass("d-none")
        $(this).parent().siblings().addClass("d-none")
        passFlag = true
      } else if (passVal == "") {
        $("#pass").addClass("invalid")
        $("#pass").removeClass("valid")
        $(this).siblings(".fa-xmark").removeClass("d-none")
        $(this).siblings(".fa-check").addClass("d-none")
        $(this).parent().siblings().removeClass("d-none")
        $(this).parent().siblings().text("This field Cannot be empty.")
        passFlag = false
      } else {
        $("#pass").addClass("invalid")
        $("#pass").removeClass("valid")
        $(this).siblings(".fa-xmark").removeClass("d-none")
        $(this).siblings(".fa-check").addClass("d-none")
        $(this).parent().siblings().removeClass("d-none")
        $(this).parent().siblings().text("Enter valid password *Minimum eight characters, at least one letter and one number:*")
        passFlag = false
      }

    })

    $("#rePass").keyup(function () {
      rePassVal = $("#rePass").val().trim()
      if (rePassVal == passVal) {
        $("#rePass").addClass("valid")
        $("#rePass").removeClass("invalid")
        $(this).siblings(".fa-xmark").addClass("d-none")
        $(this).siblings(".fa-check").removeClass("d-none")
        $(this).parent().siblings().addClass("d-none")
        rePassFlag = true
      } else if (rePassVal == "") {
        $("#rePass").addClass("invalid")
        $("#rePass").removeClass("valid")
        $(this).siblings(".fa-xmark").removeClass("d-none")
        $(this).siblings(".fa-check").addClass("d-none")
        $(this).parent().siblings().removeClass("d-none")
        $(this).parent().siblings().text("This field Cannot be empty.")
        rePassFlag = false
      } else {
        $("#rePass").addClass("invalid")
        $("#rePass").removeClass("valid")
        $(this).siblings(".fa-xmark").removeClass("d-none")
        $(this).siblings(".fa-check").addClass("d-none")
        $(this).parent().siblings().removeClass("d-none")
        $(this).parent().siblings().text("Password and Re-Password do not matching")
        rePassFlag = false
      }
      if (nameFlag && emailFlag && ageFlag && phoneFlag && passFlag & rePassFlag) {
        document.getElementById("submit").removeAttribute("disabled")

      } else {
        ocument.getElementById("submit").setAttribute("disabled", "true")
      }
    })
  }
  valid()
  $(".scroll").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".scroll").fadeIn().css("display", "flex");
    } else {
      $(".scroll").fadeOut()
    }
  })
  $("#submit").click(function () {
    let final = `<h2>Thanks ${nameVal}</h2>
    <p>We will contact you soon...</p>
    <p class="text-danger">If there is an emergency, you can visit us at our headquarters, 6 Al-Majd st. , Al-Zahraa Building, Aswan</p>`
    $(".done").html(final)
    $(".done").removeClass("d-none")
  })
});



