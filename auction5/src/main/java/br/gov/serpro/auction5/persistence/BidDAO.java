/*
 * Demoiselle Framework
 * Copyright (c) 2009 Serpro and other contributors as indicated
 * by the @author tag. See the copyright.txt in the distribution for a
 * full listing of contributors.
 *
 * Demoiselle Framework is an open source Java EE library designed to accelerate
 * the development of transactional database Web applications.
 *
 * Demoiselle Framework is released under the terms of the LGPL license 3
 * http://www.gnu.org/licenses/lgpl.html  LGPL License 3
 *
 * This file is part of Demoiselle Framework.
 *
 * Demoiselle Framework is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License 3 as published by
 * the Free Software Foundation.
 *
 * Demoiselle Framework is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Demoiselle Framework.  If not, see <http://www.gnu.org/licenses/>.
 */
package br.gov.serpro.auction5.persistence;

import java.util.List;

import javax.persistence.Query;

import br.gov.frameworkdemoiselle.template.JPACrud;
import br.gov.serpro.auction5.domain.Auction;
import br.gov.serpro.auction5.domain.Bid;

/**
 * This DAO implementation class exhibits the usage of JPQL queries with
 * positional parameters and the respective results pagination.
 * 
 * @author CETEC/CTJEE
 * @see IDAO
 * @see JPAGenericDAO
 */
public class BidDAO extends JPACrud<Bid, Long> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public List<Bid> listLastBidsForAuction(Auction auction) {
		
		String jpql = "select b from Bid b where b.auction.id = ?1 order by b.timestamp desc";
		
		Query query = getEntityManager().createQuery(jpql);
		
		query.setParameter(1, auction.getId());
		
		return query.getResultList();
	}

}
