package com.example.hvz.Humans_vs_Zombies.service;

import java.util.Collection;

/**
 * Create Read Update Delet data structure interface
 *
 * @param <T> - the type of the object that the repository consists of
 * @param <ID> - the ID of the
 */
public interface CrudService<T, ID> {
  // Generic CRUD
  /**
   * Reads a single object
   *
   * @return - a single object specified by id
   * @throws - SQLException
   */
  T findById(ID id);

  /**
   * Reads a specified table from the database
   *
   * @return - a Collection of objects read from the database
   * @throws - SQLException
   */
  Collection<T> findAll();

  /**
   * Adds the given object to database
   *
   * @param - the object to insert into the database
   * @return - the object that added
   * @throws - SQlException
   */
  T add(T entity);

  /**
   * Updates a given object in the database
   *
   * @param - the updated object
   * @return - the updated object
   * @throws - SQlException
   */
  T update(T entity);

  /**
   * Deletes the object with the given id from database
   *
   * @param - the object to delete from the database
   * @return - nothing
   * @throws - SQlException
   */
  void deleteById(ID id);

  /**
   * Deletes the given object from database
   *
   * @param - the object to delete from the database
   * @return - nothing
   * @throws - SQlException
   */
  void delete(T entity);
}
