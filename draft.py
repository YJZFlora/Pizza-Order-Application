class User(models.Model):
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=64)

    def __str__(self):
          return f"id: {self.id} name: {self.username} with password: {self.password} "

WebElement element = driver.findElement(By.id("order"));
String contents = (String)((JavascriptExecutor)driver).executeScript("return arguments[0].innerHTML;", element);


def checkout(request):
    driver = webdriver.Chrome('/Users/flora/Documents/projects/project3/chromedriver')
    driver.get(file_uri("index.html"))
    order = driver.find_element_by_id("order")
    order_content = order.get_attribute('innerHTML')


    return render(request, "orders/register_succ.html")

    soup = BeautifulSoup(page.text, 'html.parser')
    message =  soup.find(id="order").get_text()

    message =  soup.find(id="order")

createElement('input');
