package com.supportportal.exception.domain;

public class ProduitNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	public ProduitNotFoundException( String message) {
		super(message);
	}
}
