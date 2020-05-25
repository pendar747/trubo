import { fixture, elementUpdated } from "@open-wc/testing-helpers";
import { fire, on } from "../util";
import './Form';

describe('tb-form', () => {

  it('should set the form values with data from the model', async () => {
    localStorage.setItem('main', JSON.stringify({ profile: { name: 'Mike', city: 'New York' } }));
    const parent = await fixture(`<div state="main"></div>`);
    const el = await fixture(`<tb-form model="profile" action="updateName">
      <input name="name" />
      <input name="city" />
      <button type="submit"></button>
    <tb-form>`, { parentNode: parent });

    await elementUpdated(el);

    expect((el.querySelector('[name="name"]') as HTMLInputElement).value).toEqual('Mike');
    expect((el.querySelector('[name="city"]') as HTMLInputElement).value).toEqual('New York');
  });
  
  it('should update the form values when the model changes', async () => {
    localStorage.setItem('main', JSON.stringify({ profile: { name: 'Mike', city: 'New York' } }));
    const parent = await fixture(`<div state="main"></div>`);
    const el = await fixture(`<tb-form model="profile" action="updateName">
      <input name="name" />
      <input name="city" />
      <button type="submit"></button>
    <tb-form>`, { parentNode: parent });
    
    const newState = {
      profile: {
        name: 'David',
        city: 'London'
      }
    }
    localStorage.setItem('main', JSON.stringify(newState));
    fire('main-state-update', newState);

    await elementUpdated(el);
    await elementUpdated(el);

    expect((el.querySelector('[name="name"]') as HTMLInputElement).value).toEqual('David');
    expect((el.querySelector('[name="city"]') as HTMLInputElement).value).toEqual('London');
  });
  
  it('should dispatch a submit event with all the current form data when the form is submitted', async () => {
    localStorage.setItem('main', JSON.stringify({ profile: { name: 'Mike', city: 'New York' } }));
    const parent = await fixture(`<div state="main"></div>`);
    const el = await fixture(`<tb-form model="profile" action="updateName">
      <input name="name" />
      <input name="city" />
      <button type="submit"></button>
    <tb-form>`, { parentNode: parent });

    const eventHandler = jasmine.createSpy();
    on('updateName', eventHandler);
    el.shadowRoot?.querySelector('form')?.dispatchEvent(new Event('submit'));

    await elementUpdated(el);

    expect(eventHandler.calls.count()).toEqual(1);
    expect(eventHandler.calls.argsFor(0)[0]).toBeInstanceOf(CustomEvent);
    expect(eventHandler.calls.argsFor(0)[0].detail).toEqual({ 
      model: 'profile', 
      values: {
        name: 'Mike',
        city: 'New York'
      } 
    });
  });

  it('should dispatch a submit event with the updated value of the input elements', async () => {
    localStorage.setItem('main', JSON.stringify({ profile: { name: 'Mike', city: 'New York' } }));
    const parent = await fixture(`<div state="main"></div>`);
    const el = await fixture(`<tb-form model="profile" action="updateName">
      <input name="name" />
      <input name="city" />
      <button type="submit"></button>
    <tb-form>`, { parentNode: parent });

    const nameInput: HTMLInputElement|null = el.querySelector('[name="name"]');
    const cityInput: HTMLInputElement|null = el.querySelector('[name="city"]');
    if (nameInput && cityInput) {
      nameInput.value = "David";
      cityInput.value = "London";
    }

    const eventHandler = jasmine.createSpy();
    on('updateName', eventHandler);
    el.shadowRoot?.querySelector('form')?.dispatchEvent(new Event('submit'));

    await elementUpdated(el);

    expect(eventHandler.calls.count()).toEqual(1);
    expect(eventHandler.calls.argsFor(0)[0]).toBeInstanceOf(CustomEvent);
    expect(eventHandler.calls.argsFor(0)[0].detail).toEqual({ 
      model: 'profile', 
      values: {
        name: 'David',
        city: 'London'
      } 
    });
  });
});