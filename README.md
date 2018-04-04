# Bitrix Project

Заготовка для 1C Bitrix проектов.

## Создание нового проекта

Стандартно установить или развернуть из бекапа копию Битрикса.

Клонировать репозиторий (за пределами публичной директории веб-сервера).

Переинициализировать репозиторий: удалить директорию `.git` и выполнить `git init`. 

Установить зависимости и "собрать" фронтенд:
```sh
composer install && npm install && npm run encore -- dev
```

Перенести в корень клонированного проекта содержимое директорий `bitrix`, `upload` и `local` 
(не затирая файл `local/php_interface/init.php`).

В директорию `sites/s1` перенести публичные файлы сайта.

Настроить вебсервер для работы с директорией `sites/s1` либо сделать симлинк вида

```sh
/home/bitrix/www -> /home/bitrix/projectname/sites/s1
```


Создать файл `.env` 

```sh
touch .env
```

Заполнить его данными в соответствии с файлом-образцом `.env.example`

Выполнить команду

```sh
./vendor/bin/jedi env:init default
```

Эта команда скопирует в директорию `bitrix` системные файлы настроек сконфигурированные для работы с 
[переменными окружения](https://github.com/vlucas/phpdotenv), а также настройки 
[шаблонизатора Twig](https://github.com/maximaster/tools.twig) 
и [логгера Monolog](https://github.com/bitrix-expert/monolog-adapter)


Установить [модуль миграций](https://github.com/arrilot/bitrix-migrations)

```sh
php migrator install
```

## Бэкенд

Composer и PSR-4 автозагрузка классов из директории `local/classes`. Пространство имен `\Local\ `

### Используемые пакеты:

- [arrilot/bitrix-migrations](https://github.com/arrilot/bitrix-migrations)
- [arrilot/bitrix-models](https://github.com/arrilot/bitrix-models)
    - [illuminate/database](https://github.com/illuminate/database)
    - [illuminate/events](https://github.com/illuminate/events)
- [bitrix-expert/monolog-adapter](https://github.com/bitrix-expert/monolog-adapter)
- [bitrix-expert/tools](https://github.com/bitrix-expert/tools)
- [maximaster/tools.twig](https://github.com/maximaster/tools.twig)
- [notamedia/console-jedi](https://github.com/notamedia/console-jedi)
- [kint-php/kint](https://github.com/kint-php/kint) и [kint-php/kint-twig](https://github.com/kint-php/kint-twig)  
- [vlucas/phpdotenv](https://github.com/vlucas/phpdotenv)

### Контроль качества

Для проверки пхп-кода используется [squizlabs/PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer).

Код проверятся в соответствии с набором правил, описанных в файле [ruleset.xml](ruleset.xml).

На данный момент, это стандарт PSR-2 
([рус.](https://svyatoslav.biz/misc/psr_translation/#_PSR-2)/[англ.](http://www.php-fig.org/psr/psr-2/)),
а также наличие PHPDoc-комментариев.

Проверяются файлы из директорий [local/classes](local/classes) и [local/components](local/components) 
(за исключением файлов `template.php`)

Проверка осуществляется командой (это запуск утилиты `phpcs` с предустановленными параметрами) 

```sh
composer run lint:php
```

Также есть возможность исправить часть обнаруженных ошибок утилитой `phpcbf`

```sh
composer run fix:php
```




## Фронтенд

В качестве "сборщика" изпользуется [symfony/webpack-encore](https://github.com/symfony/webpack-encore). 

По-умолчанию файлы фронтенда должны располагаться в директории `local/assets`.

Это можно переопределить в файле конфигурации [webpack.config.js](./webpack.config.js) 

Основные команды:

```sh
npm run encore -- dev          # запустить сборку один раз
npm run encore -- dev --watch  # запустить сборку в режиме слежения за файлами
npm run encore -- production   # запустить сборку для продакшена
```



### Технологии

- Stylus ([англ](https://github.com/stylus/stylus))
- "Современный" Javascript ([рус](https://learn.javascript.ru/es-modern)/[англ](https://github.com/metagrover/ES6-for-humans))
    - [DOM-based Router](https://github.com/roots/sage/blob/master/resources/assets/scripts/util/Router.js)
    - [Vue JS](https://vuejs.org/)
    
#### Vue

Мини-модуль [vueInvoker](local/assets/scripts/util/vueInvoker.js) 
предназначен для инициализации Vue компонентов на странице.
Он упрощает использование Vueклассическом веб-приложении, когда нет возможности 
использовать один "корневой" экземпляр `Vue` (Как, например, это устроено в одностраничных приложениях).

#### Использование:

Вывести на страницу элемент-плейсхолдер для компонента:

```html
<div class="vue-component" data-component="DemoApp" data-initial='{"test": "data"}'></div>
```

Создать соответствущий Vue-компонент (в директории `local/assets/scripts/vue/components/`:


```html
<template>
    <div class="demo-app">
        {{ hello }}

        {{ test }}

    </div>
</template>

<script>
    export default {
      data() {
        return {
          hello: 'World',
        };
      },
      props: {test: "data"},
    };
</script>
```

Добавить его в Коллекцию `local/assets/scripts/vue/collection.js`:

```js
import DemoApp from './components/DemoApp.vue';

export default {
  DemoApp,
};
```

    
### Контроль качества

JS-файлы проверяются на соответствие стандарту [airbnb](https://github.com/airbnb/javascript) 
утилитой [ESLint](https://eslint.org). Конфигурация линтера - файл [.eslintrc](.eslintrc)

```sh
npm run lint:scripts  # показать ошибки
npm run fix:scripts   # исправить ошибки
```

CSS-файлы проверяются утилитой [stylelint](https://stylelint.io/).  
Конфигурация - файл [.stylelintrc](.stylelintrc)

```sh
npm run lint:styles  # показать ошибки
npm run fix:styles   # исправить ошибки
```

За исправление стилевых файлов отвечает пакет [stylefmt](https://github.com/morishitter/stylefmt)


## Многосайтовость

Структура проекта напоминает _заранее_ настроенную 
[многосайтовость на разных доменах](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=103&LESSON_ID=287) 
с отдельными директориями для каждого сайта. Файлы ядра подключаются _относительными_ символическими ссылками.
Для добавления нового сайта нужно создать новую директорю в `./sites/`(лучше всего если ее название будет 
соответствовать коду нового сайта). И добавить в нее ссылки на необходимые файлы и директории:

```
mkdir sites/s2             # создать директорию для дополнительного сайта
cd sites/s2                # перейти в нее
ln -s ../../bitrix bitrix  # и
ln -s ../../local local    # добавить 
ln -s ../../upload upload  # ссылки     
``` 

Далее необходимо настроить веб-сервер для работы с новым сайтом.

# Версионирование и деплой 
## Структура репозитория
 Код в репозитрии хранится в ДВУХ ветках
 
 master - здесь "хранятся" новые фичи и некритичные правки.
 
 production - содержимое этой ветки выводится на "основном" сервере.

### Разработка
 Ведется с примененим ревизий и ревью кода:
 
 Разработчик, получив задачу:
 
- обновляет репозиторий
- создает от ветки мастер новую ветку с номером задачи и/или с кратким описанием задачи
- пишет код, тестирует его, создает ревизию (Pull/Merge Request etc)
- исправляет код (если требуется) после ревью
- вливает код в мастер ветку, после того как ревизия принята.
- Исправление критичного бага
- Часто бывают ситуации, когда на боевом окружении обнаруживаются неполадки, требующие незамедлительного исправления, в этом случае процесс работы аналогичен описанному выше с той разницей, что ветка для разработки создается от production-ветки, а затем вливается и в нее и в master-ветку.
 
### Подготовка к релизу
 После того как в мастер-ветку добавлена одна или несколько задач, нужно убедиться, что все работает как и ожидается, ничего не "пропало" из кодовой базы. Не произошло никаких регрессий с предыдущими правками/доработками.
 
 Если все ок, то начинаем готовить production ветку к релизу. На основном сервере необходимо проверить наличие несохраненных правок. Например была добавлена новая страница, новый пункт меню и тд. Для Битрикс это означает изменение файлов. Чтобы не потерять эти изменения нужно:
 
- зайти на основной сервер.
- проверить - есть ли изменения git status
- если есть - сделать коммит
```` git add .
 git commit -m 'Production changes'
 git push origin production
````
- у себя получить эти изменения в ветку production:
````
 git checkout production
 git pull origin production
````
- узнать хэш последнего production-коммита (git log например, либо посмотреть в веб интерфейсе, либо на предыдущих шагах), например 164d1f8e335da47f724
- Выполнить команду cherry-pick, чтобы применить этот коммит к master-ветке (cherry-pick позволит "не засорять историю репозитория малоинформативными merge-коммитами"):
````
 git checkout master
 git pull origin master на всякий случай
 git cherry-pick 164d1f8e335da47f724
````
- Затем нужно убедиться что эти изменения ничего не ломают в мастер-ветке и, если требуется, исправить все неполадки
- Далее производится мерж Мастер-ветки в Продакшн-ветку.
````
 git checkout production
 git merge master
````
 Таким образом master ветка получает свежие изменения с "боевого" сайта (благодаря этому получаем возможность более раннего обнаружения потенциальных конфликтов и багов при разработке), а production - все актуальные изменения, готовые к переносу на "боевое" окружение.
 
### Деплой
 В простейших случаях для релиза достаточно на боевом окружении выполнить команду git pull.
 
 Но при использовании composer, миграций и при сборке фронтенда с помощью nodejs-утилит (а без всего этого нынче никак, либо очень грустно и непродуктивно), сайт в процесса обновления может потерять свою работоспособность. А выполнение вручную таких операций как composer install, npm run build и тд повышает вероятность каких либо ошибок в процессе релиза, к тому же все это не самые быстрые операции.
 
 Два очевидных выхода из ситуации:
 
- самописный скрипт для обновления данных на сайте например такой
- готовый инструмент для деплоя: Capistrano, Vlad, SaltStack, Rocketeer, Deployer (тысячи их)
 В нашем случае используется Deployer.
 
 Работает все предельно просто:
 
 А при желании и необходимости все можно усложнить, добавив хостам "роли", настроив параллельное выполнение задач, расширив функциональность дополнительными задачами и "рецептами". Подробности в документации утилиты.
 
 В файле hosts.yml указываются все возможные "хосты", на которые планируется загружать релизы.
```` 
 testhost.com:
     port: 22
     user: testhost_ssh_user
     identityFile: ~/.ssh/id_rsa
     deploy_path: /home/testhost/project_releases
     branch: master
     restart_cmd: "service apache2 restart"
 
 prodhost.com:
     port: 22
     user: bitrix
     identityFile: ~/.ssh/id_rsa
     deploy_path: /home/bitrix/project_releases
     branch: production
     restart_cmd: "sudo /bin/systemctl restart  httpd.service && sudo /bin/systemctl restart  nginx.service"
````
 В файле deploy.php описывается сценарий деплоя и всякие настройки.
 
 Соответственно, чтобы загрузить изменения на "тестовый" testhost.com, нужно выполнить команду:
 
 dep deploy testhost.com
 Тогда содержимое ветки мастер (ветка указывается в hosts.yml) будет загружено в качестве нового релиза на этот хост.
 
 Если выполнить команду
 
 dep deploy prodhost.com
 То релиз загрузится на основной сайт, соответсвенно данные возьмуться из ветки production
 
 В процессе выполнены различные доп. действия:
 
- создание файловой структуры
- установка зависимостей
- применение миграций
- сброс кеша
- перезагрузка веб-сервера
- смена релиза
 Если на каком-то шаге случится ошибка, то данный "релиз" не применится и соответственно это не повлияет на сайт.
 
 Deployer создает следующую структуру файлов
 .  
 ├── current -> releases/8  
 ├── releases  
 │   ├── 4  
 │   ├── 5  
 │   ├── 6  
 │   ├── 7  
 │   └── 8  
 └── shared  
.....├── bitrix  
.....└── upload  
 По адресу <deployment_path/current> находится ссылка на последний релиз. Релиз можно "откатить" командой
```` 
 $ dep deploy rollback
 ✔ Executing task rollback
````
 В примере выше это будет означать что ссылка current станет уаказывать на релиз №7, а неудачный релиз №8 будет удален:
 
 .  
 ├── current -> releases/7  
 ├── releases  
 │   ├── 4  
 │   ├── 5  
 │   ├── 6  
 │   └── 7  
 └── shared  
.....├── bitrix  
.....└── upload  
 
### Общие файлы
 В директории shared должны лежать "общие" для всех релизов файлы и папки. В нашем случае это директории bitrix и upload. Команда 'deploy:shared' для каждого релиза содает симлинки на эти директории.
 
### Настройка сервера
 После успешного первого релиза нужно перенести в shared необходимые директории. И создать симлинк для директории веб-сервера.
 
 На сервере это обычно директория /home/username/public_html/ Поэтому для работы с релизами нужна такая ссылка:
 
 /home/testhost/public_html -> /home/testhos/project_releases/current/sites/s1
 Для серверов на базе Bitrix VM это /home/bitrix/www/ Симлинк:
 
 /home/bitrix/www -> /home/bitrix/project_releases/current/sites/s1
 Так как веб сервер не сразу замечает "переключение" симлинка при новом релизе, то необходима его перезагрузка, за нее отвечает задача deploy:restart для каждого хоста нужно указать свою последовательность команд для этого действия в файле hosts.yml
 
 Таски check:uncommited и check:unpushed как следует из их названия проверяют директорию предыдущего релиза на наличие незакомиченных и незапушенных изменений и прерывают деплой, если такие вещи есть в релизе. Как разбираться с такими ситуациями написано в самом начале этой заметки
 
 Проверить хост на наличие несохраненных изменений можно командой check:
```` 
 $ dep check prodhost.com
```` 
 Эта проверка автоматически срабатывает при каждом деплое (команда dep deploy hostname). Чтобы пропустить проверку к команде нужно добавить флаг --skip-git-check.
 
 $ dep deploy production --skip-git-check
 