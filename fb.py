from selenium import webdriver
import selenium
import time
from selenium.webdriver.common.keys import Keys
chrome_options = webdriver.ChromeOptions()

prefs = {"profile.default_content_setting_values.notifications" : 2}

chrome_options.add_experimental_option("prefs",prefs)

driver = webdriver.Chrome(options=chrome_options)
driver.get("https://fb.com/")
username = input("Enter username")
password = input("Enter password")
driver.find_element_by_xpath('//*[@id="email"]').send_keys(username)
driver.find_element_by_xpath('//*[@id="pass"]').send_keys(password)
driver.find_element_by_xpath('//*[@id="pass"]').send_keys(Keys.RETURN)
driver.get("https://www.facebook.com/groups/477704462750133/")
ufiList = []
ufiLength = driver.execute_script('return document.getElementsByClassName("UFIList").length;')

for i in range(int(ufiLength)):
    temp = driver.execute_script('return document.getElementsByClassName("UFIList")["' + str(i) + '"].children[2].id;')
    ufiList.append(temp)
actions = webdriver.ActionChains(driver)
actions.send_keys("Swapnil saar gawd +_+")
actions.send_keys(Keys.ENTER)
for i in ufiList:
    try:
        temp=driver.find_element_by_xpath('//*[@id="'+i+'"]/div/div[2]/div/div/div/div[1]/div')
        time.sleep(1)
        temp.click()
        time.sleep(1)
        actions.perform()
    except selenium.common.exceptions.WebDriverException:
        pass
