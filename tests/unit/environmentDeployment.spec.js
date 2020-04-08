import {expect} from "chai";
import {shallowMount} from '@vue/test-utils'
import EnvironmentDeployment from "@/components/EnvironmentDeployment";

describe('EnvironmentDeployment', () => {
  it('renders a date as readable', () => {
    const wrapper = shallowMount(EnvironmentDeployment, {
      propsData: {
        deployedAt   : '',
        triggererIcon: ''
      }
    });

    expect(wrapper.vm.readableDate(0)).to.equal('Thursday, January 1st 1970, 12:00:00 am');
    expect(wrapper.vm.readableDate(1582901700000)).to.equal('Friday, February 28th 2020, 2:55:00 pm')
  });
});
