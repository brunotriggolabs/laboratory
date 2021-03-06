/*
 * Copyright 2011 cruxframework.org.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package org.cruxframework.bookmark.client.controller;

import org.cruxframework.crux.core.client.controller.Controller;
import org.cruxframework.crux.core.client.controller.Expose;
import org.cruxframework.crux.core.client.screen.Screen;
import org.cruxframework.crux.widgets.client.simplecontainer.SimpleViewContainer;

/**
 * Descrição da classe: Está classe possui os métodos de controle da tela de index da aplicação.
 *  
 * @author bruno.rafael 
 */
@Controller("indexController")
public class IndexController
{
	/**
	 * Este método carrega os SimpleViewContainer “heade” e “container” com as view 
	 * “menu” e “homebookmark” respectivamente. 
	 */
	@Expose
	public void onActivate()
	{
		SimpleViewContainer header = (SimpleViewContainer) Screen.get("header");
		header.showView("menu");
		SimpleViewContainer container = (SimpleViewContainer) Screen.get("container");
		container.showView("homebookmark");
	}
}
