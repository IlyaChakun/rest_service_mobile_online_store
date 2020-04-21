import LocalizedStrings from 'react-localization';
import {
    PRODUCT_DESCRIPTION_MAX_LENGTH,
    PRODUCT_NAME_MAX_LENGTH,
    PRODUCT_NAME_MIN_LENGTH,
    PRODUCT_TAG_MAX_LENGTH,
    PRODUCT_TAG_MIN_LENGTH,
    EMAIL_MAX_LENGTH,
    MAX_PRICE,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH
} from "../constants";

export const localizedStrings = new LocalizedStrings({

        en: {
            logout: "Logout",
            login: "Login",
            signUp: "Sign up",
            certificates: "Mobiles",
            shopName: "Mobiles shop",
            logInWithGoogle: "Log in with Google",
            logInWithGithub: "Log in with github",
            loginFormRegisterNow: " register now!",
            alreadyRegister: "Already registered?",
            signUpFromLoginNow: "Login now!",
            or: "or",
            email: "email",
            password: "Password",
            loginField: "Login",
            editCertificate: 'Update mobile',


            sort: 'Sort: ',
            sortByPrice: 'By price',
            sortByDateOfCreation: 'By dateOfCreation',


            //certificate
            certificateName: "Mobile name",
            description: "Description",
            price: "Price",
            expirationPeriod: "Expiration period",
            days: "days",
            tag: "Tag",
            //
            profile: "Profile",
            addCertificate: "Add mobile",


            ///params
            name: "Name",
            confPassword: "Confirmed password",
            //alerts
            alertBadEmail: "Please input your email!",
            alertBadPassword: "Please input your Password!",
            alertSuccessRegister: "Thank you! You're successfully registered. Please Login to continue!",

            alertException: "Sorry! Something went wrong. Please try again!",


            //cert
            alertBadTagTooShort: `Tag is too short (Minimum ${PRODUCT_TAG_MIN_LENGTH} characters allowed)`,
            alertBadTagTooLong: `Tag is too long (Maximum ${PRODUCT_TAG_MAX_LENGTH} characters allowed)`,

            alertBadCertificateDescription: `Description is too long (Maximum ${PRODUCT_DESCRIPTION_MAX_LENGTH} characters allowed)`,

            alertBadCertificatePriceTooSmall: 'Price can`t be <0',
            alertBadCertificatePriceTooBig: `Price is too big (Maximum ${MAX_PRICE}  allowed )`,

            alertBadCertificateNameTooShort: `Name is too short (Minimum ${PRODUCT_NAME_MIN_LENGTH} characters allowed;\nMaximum ${PRODUCT_NAME_MAX_LENGTH} characters allowed )`,
            alertBadCertificateNameTooLong: `Name is too long (Minimum ${PRODUCT_NAME_MIN_LENGTH} characters allowed;\nMaximum ${PRODUCT_NAME_MAX_LENGTH} characters allowed )`,

            alertEmailNotValid: 'Email is not valid!',
            alertEmailToLong: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`,
            alertEmailAlreadyInUser: 'This Email is already registered',
            alertPasswordTooShort: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`,
            alertPasswordTooLong: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`,
            alertConfPass: 'Confirmed pass do not match with pass',

            alertOrderCreated: 'Order created! Thanks!',


            alertDeleteCertificateSuccessfully: 'Mobile deleted successfully!',
            alertEditCertificateSuccessfully: 'Mobile edited successfully!',
            alertAddCertificateSuccessfully: 'Mobile added successfully!',
            alertEmptyEmail: 'Email may not be empty',

            alertAppName: 'Mobile App',
            alertLoggedOut: 'You have been logged out. Please login create certificate.',


            alertWrongEmailOrPassword: 'Your Username or Password is incorrect. Please try again!',
            alertSuccessLogin: 'You are successfully logged in!',

            alertRebootPage: 'Reboot? The changes you made may not be saved.',

            alertNoPermission: 'No permissions,Sorry!',
            alertSuccessLogOut: 'You are successfully logged out!',

            alertPageNotFound: " The Page you're looking for was not found. ",
            alertPageNoPermission: " You have no permission. Sorry!",
            ///helpers
            helpForPass: "A password between 6 to 20 characters",
            helpForEmail: "Your email",
            helpForCertificateName: "Enter name",
            helpForCertificateDescription: "Enter description",
            helpForCertificatePrice: "Enter price",
            helpSearch: "Search...",

            helpDeleteModal: "Do you want to delete mobile?",
            helpCancel: "Cancel",
            helpOk: "Ok",

            helpBuyProduct: "Are you sure?",

            alreadyBought: "Bought",
            //footer
            footerText: "2020 All Rights Reserved",

            //buttons
            edit: "Edit",
            delete: "Delete",
            add: "Save",
            buy: "Buy",
            addTag: "Add a tag",
            search: "Search",
            selectShowAllCertificates: "All",
            selectShowMyCertificates: "My purchases",
            goBack: 'Go back',

            //months
            january: "January",
            february: "February",
            march: "March",
            april: "April",
            may: "May",
            june: "June",
            july: "July",
            august: "August",
            september: "September",
            october: "October",
            november: "November",
            december: "December",
            ///
        },
        ru: {
            logout: "Выйти",
            login: "Войти",
            signUp: "Регистрация",
            certificates: "Телефоны",
            shopName: "Магазин телефонов",
            logInWithGoogle: "Войти через Google",
            logInWithGithub: "Войти через github",
            alreadyRegister: "Уже зарегистрированы?",
            loginFormRegisterNow: " зарегистрируйся сейчас!",
            signUpFromLoginNow: "Залогиньтесь!",
            or: "или",
            email: "Электронная почта",
            password: "Пароль",
            loginField: "Логин",
            editCertificate: 'Изменить товар',


            sort: 'Сортировать: ',
            sortByPrice: 'По цене',
            sortByDateOfCreation: 'По дате создания',


            //certificate
            certificateName: "Название ",
            description: "Описание",
            price: "Цена",
            expirationPeriod: "Срок действия сертификата",
            days: "дней",
            tag: "Тэг",
            //

            profile: "Профиль",
            addCertificate: "Добавить товар",

            ///params
            name: "Имя",
            confPassword: "Подтвержденный пароль",


            //alerts
            alertBadEmail: "Пожалуйста, введите Вашу электронную почту",
            alertBadPassword: "Пожалуйста, введите Ваш пароль",
            alertSuccessRegister: "Спасибо! Вы успешно зарегистрированы. Пожалуйста, залогиньтесь для продолжения!",

            alertException: "Извините! Что-то пошло не так. Попробуйте еще раз!",

            alertRebootPage: 'Перезагрузить? Возможно, внесенные изменения не сохранятся.',
            //cert
            alertBadTagTooShort: `Тэг очень короткий! (Минимум ${PRODUCT_TAG_MIN_LENGTH} символов)`,
            alertBadTagTooLong: `Тэг очень длинный (Максимум ${PRODUCT_TAG_MAX_LENGTH} символов)`,

            alertBadCertificateDescription: `Описание очень длинное (Максимум ${PRODUCT_DESCRIPTION_MAX_LENGTH} символов)`,

            alertBadCertificatePriceTooSmall: 'Стоимость не может быть меньше 0',
            alertBadCertificatePriceTooBig: `Стоимость слишком большая (Максимум ${MAX_PRICE}  )`,

            alertBadCertificateNameTooShort: `Название очень короткое (Минимум ${PRODUCT_NAME_MIN_LENGTH} символов;\nМаксимум ${PRODUCT_NAME_MAX_LENGTH} символов )`,
            alertBadCertificateNameTooLong: `Название очень длинное (Максимум ${PRODUCT_NAME_MAX_LENGTH} символов;\nМинимум ${PRODUCT_NAME_MIN_LENGTH} символов )`,

            alertEmailNotValid: 'Email не корретный!',
            alertEmailToLong: `Email слишком длинный (Максимум ${EMAIL_MAX_LENGTH} символов)`,
            alertEmailAlreadyInUser: 'Этот email уже занят!',
            alertPasswordTooShort: `Пароль слишком короткий (Минимум ${PASSWORD_MIN_LENGTH} символов.)`,
            alertPasswordTooLong: `Пароль слишком длинный (Максимум ${PASSWORD_MAX_LENGTH} символов.)`,
            alertConfPass: 'Потвержденый пароль не совпал с паролем',

            alertOrderCreated: 'Заказ принят! Спасибо',
            alertEmptyEmail: 'Email не может быть пустым',

            alertDeleteCertificateSuccessfully: 'Телефон удален успешно!',
            alertEditCertificateSuccessfully: 'Телефон изменен успешно!',
            alertAddCertificateSuccessfully: 'Телефон добавлен успешно!',

            alertAppName: 'Магазин телефонов',
            alertLoggedOut: 'Вы вышли из системы. Пожалуйста, залогиньтесь для этого действия.',

            alertWrongEmailOrPassword: 'Ваш логин или пароль неверны. Пожалуйста, попробуйте еще раз!',

            alertSuccessLogin: 'Успешный вход!',

            alertNoPermission: 'У вас нет прав, сори!',
            alertSuccessLogOut: 'Успешный выход!',
            alertPageNotFound: " Страница не найдена! ",
            alertPageNoPermission: " У вас нет прав, сори!",
            ///helpers
            helpForPass: "Пароль должен быть от 6 до 20 символов",
            helpForEmail: "Ваша электронная почта",
            helpForCertificateName: "Введите название телефона",
            helpForCertificateDescription: "Введите описание телефона",
            helpForCertificatePrice: "Введите стоимость телефона",
            helpSearch: "Поиск...",

            helpDeleteModal: "Вы действительно хотите удалить телефон?",
            helpCancel: "Закрыть",
            helpOk: "Потдвердить",

            helpBuyProduct: "Вы уверены?",
            alreadyBought: "Куплен",
            //footer
            footerText: "2020 Все права защищены",

            //buttons
            edit:
                "Изменить",
            delete:
                "Удалить",
            add:
                "Сохранить",
            buy:
                "Купить",
            addTag:
                "Добавить тэг",

            search: "Поиск",
            selectShowAllCertificates: "Всё",
            selectShowMyCertificates: "Мои покупки",
            goBack: 'Назад',
            //months
            january: "Январь",
            february: "Февраль",
            march: "Март",
            april: "Апрель",
            may: "Май",
            june: "Июнь",
            july: "Июль",
            august: "Август",
            september: "Сентябрь",
            october: "октябрь",
            november: "Ноябрь",
            december: "Декабрь",
            ///


        }
    })
;
