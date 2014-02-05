/*
 * Demoiselle Framework
 * Copyright (C) 2014 SERPRO
 * ----------------------------------------------------------------------------
 * This file is part of Demoiselle Framework.
 * 
 * Demoiselle Framework is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public License version 3
 * as published by the Free Software Foundation.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License version 3
 * along with this program; if not,  see <http://www.gnu.org/licenses/>
 * or write to the Free Software Foundation, Inc., 51 Franklin Street,
 * Fifth Floor, Boston, MA  02110-1301, USA.
 * ----------------------------------------------------------------------------
 * Este arquivo é parte do Framework Demoiselle.
 * 
 * O Framework Demoiselle é um software livre; você pode redistribuí-lo e/ou
 * modificá-lo dentro dos termos da GNU LGPL versão 3 como publicada pela Fundação
 * do Software Livre (FSF).
 * 
 * Este programa é distribuído na esperança que possa ser útil, mas SEM NENHUMA
 * GARANTIA; sem uma garantia implícita de ADEQUAÇÃO a qualquer MERCADO ou
 * APLICAÇÃO EM PARTICULAR. Veja a Licença Pública Geral GNU/LGPL em português
 * para maiores detalhes.
 * 
 * Você deve ter recebido uma cópia da GNU LGPL versão 3, sob o título
 * "LICENCA.txt", junto com esse programa. Se não, acesse <http://www.gnu.org/licenses/>
 * ou escreva para a Fundação do Software Livre (FSF) Inc.,
 * 51 Franklin St, Fifth Floor, Boston, MA 02111-1301, USA.
 */
package br.gov.frameworkdemoiselle.serpro.bookmarkaudit.business;

import br.gov.frameworkdemoiselle.component.audit.annotation.Audit;
import br.gov.frameworkdemoiselle.lifecycle.Startup;
import br.gov.frameworkdemoiselle.serpro.bookmarkaudit.domain.Bookmark;
import br.gov.frameworkdemoiselle.serpro.bookmarkaudit.persistence.BookmarkDAO;
import br.gov.frameworkdemoiselle.stereotype.BusinessController;
import br.gov.frameworkdemoiselle.template.DelegateCrud;
import br.gov.frameworkdemoiselle.transaction.Transactional;

/**
 * 
 * @author SERPRO
 * 
 */

@BusinessController
public class BookmarkBC extends DelegateCrud<Bookmark, Long, BookmarkDAO> {

    private static final long serialVersionUID = 1L;

    @Startup
    @Transactional
    @Audit(description = "Carga Automática")
    public void load() {
        for (Bookmark bookmark : findAll()) {
            delete(bookmark.getId());
        }
        if (findAll().isEmpty()) {
            insert(new Bookmark("Demoiselle Portal", "http://www.frameworkdemoiselle.gov.br"));
            insert(new Bookmark("Demoiselle SourceForge", "http://sf.net/projects/demoiselle"));
            insert(new Bookmark("Twitter", "http://twitter.frameworkdemoiselle.gov.br"));
            insert(new Bookmark("Blog", "http://blog.frameworkdemoiselle.gov.br"));
            insert(new Bookmark("Wiki", "http://wiki.frameworkdemoiselle.gov.br"));
            insert(new Bookmark("Bug Tracking", "http://tracker.frameworkdemoiselle.gov.br"));
            insert(new Bookmark("Forum", "http://forum.frameworkdemoiselle.gov.br"));
            insert(new Bookmark("SVN", "http://svn.frameworkdemoiselle.gov.br"));
            insert(new Bookmark("Maven", "http://repository.frameworkdemoiselle.gov.br"));
            insert(new Bookmark("Downloads", "http://download.frameworkdemoiselle.gov.br"));
        }
    }

    @Audit(description = "Inserir Bookmark")
    public Bookmark inserir(Bookmark bean) {
        return insert(bean);
    }

    @Override
    @Audit(description = "Excluir Bookmark")
    public void delete(Long id) {
        super.delete(id);
    }




}